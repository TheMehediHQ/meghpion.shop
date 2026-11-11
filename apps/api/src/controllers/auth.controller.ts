import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    const { name, email, phone } = req.body;
    // Foundation stub
    sendSuccess({
      res,
      statusCode: 201,
      message: 'User registration endpoint ready',
      data: {
        user: { name, email, phone, role: 'customer' },
      },
    });
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { emailOrPhone } = req.body;
    // Foundation stub
    sendSuccess({
      res,
      statusCode: 200,
      message: 'User login endpoint ready',
      data: {
        identifier: emailOrPhone,
        token: 'foundation-jwt-token-placeholder',
      },
    });
  }
}
