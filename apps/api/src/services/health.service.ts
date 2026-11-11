import { getDatabaseStatus } from '../config/database.js';
import { HealthCheckResponse } from '@meghpiyon/shared';

export class HealthService {
  public static getHealth(): HealthCheckResponse {
    const dbStatus = getDatabaseStatus();

    return {
      status: dbStatus.isConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      service: 'meghpiyon-api',
      version: '1.0.0',
      database: {
        connected: dbStatus.isConnected,
        status: dbStatus.state,
      },
    };
  }
}
