import { Request, Response, NextFunction } from 'express';
import { verifyJwt, type JwtPayload } from '../utils/auth.js';
import { sendError } from '../utils/apiResponse.js';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/** Require a valid Bearer JWT token on the request. */
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    sendError(res, 401, 'Authentication required. Please sign in.', undefined, 'UNAUTHORIZED');
    return;
  }

  const token = authHeader.slice(7).trim();
  const payload = verifyJwt(token);
  if (!payload) {
    sendError(res, 401, 'Invalid or expired session token. Please sign in again.', undefined, 'INVALID_TOKEN');
    return;
  }

  req.user = payload;
  next();
};

/** Restrict access to one or more allowed roles. Must be used after requireAuth. */
export const requireRole = (...allowedRoles: Array<'customer' | 'employee' | 'admin' | 'moderator'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 401, 'Authentication required.', undefined, 'UNAUTHORIZED');
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        403,
        `Access denied. Requires one of: ${allowedRoles.join(', ')}`,
        undefined,
        'FORBIDDEN'
      );
      return;
    }

    next();
  };
};
