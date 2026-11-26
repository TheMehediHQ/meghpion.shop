import { Router } from 'express';
import { OrderController } from '../../controllers/order.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js';
import { CreateOrderSchema } from '@meghpiyon/shared';

export const orderRouter = Router();

orderRouter.get(
  '/',
  requireAuth,
  requireRole('admin', 'employee', 'moderator'),
  OrderController.listOrders
);

orderRouter.post(
  '/',
  validateRequest({ body: CreateOrderSchema }),
  OrderController.createOrder
);

orderRouter.get('/:orderNumber', OrderController.trackOrder);

orderRouter.patch(
  '/:id/status',
  requireAuth,
  requireRole('admin', 'employee', 'moderator'),
  OrderController.updateOrderStatus
);
