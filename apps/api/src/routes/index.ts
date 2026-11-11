import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';
import { v1Router } from './v1/index.js';

export const rootRouter = Router();

// Unversioned top-level health check endpoint (GET /api/health)
rootRouter.get('/health', HealthController.checkHealth);

// Version 1 API routes (mounted under /api/v1)
rootRouter.use('/v1', v1Router);
