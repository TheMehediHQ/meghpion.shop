import { Request, Response } from 'express';
import { UserModel } from '../models/user.model.js';
import { sendError, sendSuccess } from '../utils/apiResponse.js';
import { hashPassword, signJwt, verifyPassword } from '../utils/auth.js';
import type { AuthenticatedRequest } from '../middleware/auth.middleware.js';

function sanitizeUser(user: {
  _id: unknown;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl?: string;
  createdAt?: Date;
}) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatarUrl: user.avatarUrl,
    createdAt: user.createdAt,
  };
}

export class AuthController {
  /** Public customer registration (always assigns 'customer' role). */
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, password } = req.body;
      const cleanEmail = String(email).toLowerCase().trim();
      const cleanPhone = String(phone).trim();

      const existing = await UserModel.findOne({
        $or: [{ email: cleanEmail }, { phone: cleanPhone }],
      });

      if (existing) {
        sendError(
          res,
          409,
          'An account with this email or phone number already exists.',
          undefined,
          'USER_EXISTS'
        );
        return;
      }

      const passwordHash = hashPassword(password);
      const user = await UserModel.create({
        name: String(name).trim(),
        email: cleanEmail,
        phone: cleanPhone,
        passwordHash,
        role: 'customer',
      });

      const token = signJwt({
        userId: String(user._id),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      sendSuccess({
        res,
        statusCode: 201,
        message: 'Account created successfully',
        data: {
          user: sanitizeUser(user),
          token,
        },
      });
    } catch (err) {
      console.error('Register error:', err);
      sendError(res, 500, 'Failed to register account', undefined, 'REGISTER_ERROR');
    }
  }

  /** Login with email or phone + password for any role (customer, employee, admin). */
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { emailOrPhone, password } = req.body;
      const identifier = String(emailOrPhone).trim();
      const lowerIdentifier = identifier.toLowerCase();

      const user = await UserModel.findOne({
        $or: [{ email: lowerIdentifier }, { phone: identifier }],
      });

      if (!user || !verifyPassword(password, user.passwordHash)) {
        sendError(res, 401, 'Invalid email/phone or password.', undefined, 'INVALID_CREDENTIALS');
        return;
      }

      const token = signJwt({
        userId: String(user._id),
        email: user.email,
        name: user.name,
        role: user.role,
      });

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Signed in successfully',
        data: {
          user: sanitizeUser(user),
          token,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      sendError(res, 500, 'Failed to sign in', undefined, 'LOGIN_ERROR');
    }
  }

  /** Get current authenticated user profile. */
  public static async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        sendError(res, 401, 'Unauthorized', undefined, 'UNAUTHORIZED');
        return;
      }

      const user = await UserModel.findById(req.user.userId).select('-passwordHash');
      if (!user) {
        sendError(res, 404, 'User not found', undefined, 'NOT_FOUND');
        return;
      }

      sendSuccess({
        res,
        statusCode: 200,
        data: { user: sanitizeUser(user) },
      });
    } catch (err) {
      console.error('Me error:', err);
      sendError(res, 500, 'Failed to fetch user profile', undefined, 'PROFILE_ERROR');
    }
  }

  /** Admin only: list all staff members (admin, employee, moderator). */
  public static async listStaff(_req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const staff = await UserModel.find({
        role: { $in: ['admin', 'employee', 'moderator'] },
      })
        .select('-passwordHash')
        .sort({ createdAt: -1 });

      sendSuccess({
        res,
        statusCode: 200,
        data: staff.map(sanitizeUser),
      });
    } catch (err) {
      console.error('List staff error:', err);
      sendError(res, 500, 'Failed to list staff members', undefined, 'STAFF_LIST_ERROR');
    }
  }

  /** Admin only: create a new employee/staff account. */
  public static async createStaff(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { name, email, phone, password, role } = req.body;
      const cleanEmail = String(email).toLowerCase().trim();
      const cleanPhone = String(phone).trim();

      const existing = await UserModel.findOne({
        $or: [{ email: cleanEmail }, { phone: cleanPhone }],
      });

      if (existing) {
        sendError(
          res,
          409,
          'A user with this email or phone number already exists.',
          undefined,
          'USER_EXISTS'
        );
        return;
      }

      const passwordHash = hashPassword(password);
      const user = await UserModel.create({
        name: String(name).trim(),
        email: cleanEmail,
        phone: cleanPhone,
        passwordHash,
        role: role || 'employee',
      });

      sendSuccess({
        res,
        statusCode: 201,
        message: 'Staff account created successfully',
        data: sanitizeUser(user),
      });
    } catch (err) {
      console.error('Create staff error:', err);
      sendError(res, 500, 'Failed to create staff account', undefined, 'STAFF_CREATE_ERROR');
    }
  }

  /** Admin only: remove a staff account (cannot delete self). */
  public static async deleteStaff(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const targetId = String(req.params.id);
      if (req.user?.userId === targetId) {
        sendError(res, 400, 'You cannot delete your own active admin account.', undefined, 'SELF_DELETE');
        return;
      }

      const deleted = await UserModel.findByIdAndDelete(targetId);
      if (!deleted) {
        sendError(res, 404, 'Staff member not found', undefined, 'NOT_FOUND');
        return;
      }

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Staff account removed',
        data: { id: targetId },
      });
    } catch (err) {
      console.error('Delete staff error:', err);
      sendError(res, 500, 'Failed to delete staff account', undefined, 'STAFF_DELETE_ERROR');
    }
  }

  /** Authenticated user: change own password after verifying current password. */
  public static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        sendError(res, 401, 'Unauthorized', undefined, 'UNAUTHORIZED');
        return;
      }

      const { currentPassword, newPassword } = req.body;
      const user = await UserModel.findById(req.user.userId);
      if (!user) {
        sendError(res, 404, 'User not found', undefined, 'NOT_FOUND');
        return;
      }

      if (!verifyPassword(currentPassword, user.passwordHash)) {
        sendError(res, 400, 'Current password is incorrect.', undefined, 'INVALID_PASSWORD');
        return;
      }

      user.passwordHash = hashPassword(newPassword);
      await user.save();

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Password updated successfully',
        data: { updated: true },
      });
    } catch (err) {
      console.error('Change password error:', err);
      sendError(res, 500, 'Failed to change password', undefined, 'PASSWORD_CHANGE_ERROR');
    }
  }

  /** Admin only: directly reset a staff member's password without old password. */
  public static async resetStaffPassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const targetId = String(req.params.id);
      const { newPassword } = req.body;

      const user = await UserModel.findById(targetId);
      if (!user) {
        sendError(res, 404, 'Staff member not found', undefined, 'NOT_FOUND');
        return;
      }

      if (user.role === 'customer') {
        sendError(res, 400, 'Use staff accounts only for admin password reset.', undefined, 'INVALID_TARGET');
        return;
      }

      user.passwordHash = hashPassword(newPassword);
      await user.save();

      sendSuccess({
        res,
        statusCode: 200,
        message: `Password reset successfully for ${user.name}`,
        data: { id: targetId, email: user.email },
      });
    } catch (err) {
      console.error('Reset staff password error:', err);
      sendError(res, 500, 'Failed to reset staff password', undefined, 'PASSWORD_RESET_ERROR');
    }
  }
}
