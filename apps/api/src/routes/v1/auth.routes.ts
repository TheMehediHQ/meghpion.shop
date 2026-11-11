import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { LoginSchema, RegisterSchema } from '@meghpiyon/shared';

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
