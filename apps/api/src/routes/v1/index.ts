import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { authRouter } from './auth.routes.js';
import { productRouter } from './product.routes.js';
import { orderRouter } from './order.routes.js';

export const v1Router = Router();

v1Router.use('/health', healthRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/products', productRouter);
v1Router.use('/orders', orderRouter);
