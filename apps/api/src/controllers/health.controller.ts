import { Request, Response } from 'express';
import { HealthService } from '../services/health.service.js';
import { sendSuccess } from '../utils/apiResponse.js';

export class HealthController {
  public static checkHealth(_req: Request, res: Response): void {
    const health = HealthService.getHealth();
    const statusCode = health.status === 'down' ? 503 : 200;
    sendSuccess({
      res,
      statusCode,
      message: 'Meghpiyon API is operational',
      data: health,
    });
  }
}
