import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { env } from './config/env.config.js';
import { connectDatabase } from './config/database.js';
import { rootRouter } from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notFound.middleware.js';

export const createApp = (): Application => {
  const app = express();

  // Ensure database is connected for serverless invocations
  app.use(async (_req, _res, next) => {
    if (mongoose.connection.readyState === 0) {
      try {
        await connectDatabase();
      } catch (err) {
        console.error('Database connection middleware error:', err);
      }
    }
    next();
  });

  // Security headers
  app.use(helmet());

  // CORS configuration
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server) or Vercel preview/production deployments
        if (
          !origin ||
          allowedOrigins.includes('*') ||
          allowedOrigins.includes(origin) ||
          origin.endsWith('.vercel.app')
        ) {
          callback(null, true);
        } else {
          callback(new Error(`CORS blocked for origin: ${origin}`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Request body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Mount API routes under /api
  app.use('/api', rootRouter);

  // 404 handler for undefined routes
  app.use(notFoundHandler);

  // Centralized global error handling middleware
  app.use(errorHandler);

  return app;
};
