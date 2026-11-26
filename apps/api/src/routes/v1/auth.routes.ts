import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js';
import {
  AdminResetStaffPasswordSchema,
  ChangePasswordSchema,
  CreateStaffSchema,
  LoginSchema,
  RegisterSchema,
} from '@meghpiyon/shared';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest({ body: RegisterSchema }),
  AuthController.register
);

authRouter.post(
  '/login',
  validateRequest({ body: LoginSchema }),
  AuthController.login
);

authRouter.get('/me', requireAuth, AuthController.me);

authRouter.post(
  '/change-password',
  requireAuth,
  validateRequest({ body: ChangePasswordSchema }),
  AuthController.changePassword
);

authRouter.get(
  '/staff',
  requireAuth,
  requireRole('admin'),
  AuthController.listStaff
);

authRouter.post(
  '/staff',
  requireAuth,
  requireRole('admin'),
  validateRequest({ body: CreateStaffSchema }),
  AuthController.createStaff
);

authRouter.patch(
  '/staff/:id/password',
  requireAuth,
  requireRole('admin'),
  validateRequest({ body: AdminResetStaffPasswordSchema }),
  AuthController.resetStaffPassword
);

authRouter.delete(
  '/staff/:id',
  requireAuth,
  requireRole('admin'),
  AuthController.deleteStaff
);
