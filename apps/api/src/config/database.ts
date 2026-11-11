import mongoose from 'mongoose';
import { env } from './env.config.js';

interface ConnectionStatus {
  isConnected: boolean;
  state: string;
}

export const getDatabaseStatus = (): ConnectionStatus => {
  const stateMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const state = mongoose.connection.readyState;
  return {
    isConnected: state === 1,
    state: stateMap[state] || 'unknown',
  };
};

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('📦 MongoDB connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error('⚠️ Could not establish initial MongoDB connection:', error instanceof Error ? error.message : error);
    console.info('💡 The server will remain active. Check MONGODB_URI or your local MongoDB service.');
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed gracefully');
  }
};
