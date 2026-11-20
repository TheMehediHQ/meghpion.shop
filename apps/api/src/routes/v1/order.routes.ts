import { Router } from 'express';
import { OrderController } from '../../controllers/order.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { CreateOrderSchema } from '@meghpiyon/shared';

export const orderRouter = Router();

orderRouter.get('/', OrderController.listOrders);

orderRouter.post(
  '/',
  validateRequest({ body: CreateOrderSchema }),
  OrderController.createOrder
);

orderRouter.get('/:orderNumber', OrderController.trackOrder);

orderRouter.patch('/:id/status', OrderController.updateOrderStatus);
