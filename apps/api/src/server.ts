import { createApp } from './app.js';
import { env } from './config/env.config.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { logger } from './utils/logger.js';

export const app = createApp();

// When running in a Vercel Serverless environment, initiate DB connection
if (process.env.VERCEL) {
  connectDatabase().catch((err) => {
    logger.error('Failed to connect to MongoDB in Vercel environment:', err);
  });
}

// In local / standalone Node.js environment, listen on PORT
if (!process.env.VERCEL) {
  const startServer = async () => {
    // Connect to MongoDB
    await connectDatabase();

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Meghpiyon API server running on port ${env.PORT} [${env.NODE_ENV}]`);
      logger.info(`🩺 Health check available at: http://localhost:${env.PORT}/api/health`);
      logger.info(`📦 API v1 available at: http://localhost:${env.PORT}${env.API_PREFIX}`);
    });

    const handleGracefulShutdown = async (signal: string) => {
      logger.info(`\n${signal} received. Initiating graceful shutdown...`);
      server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDatabase();
        process.exit(0);
      });

      // Force shutdown after timeout
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
  };

  startServer().catch((err) => {
    logger.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;
