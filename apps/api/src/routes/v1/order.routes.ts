import { Router } from 'express';
import { OrderController } from '../../controllers/order.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { CreateOrderSchema } from '@meghpiyon/shared';

export const orderRouter = Router();

orderRouter.post(
  '/',
  validateRequest({ body: CreateOrderSchema }),
  OrderController.createOrder
);

orderRouter.get('/:orderNumber', OrderController.trackOrder);
