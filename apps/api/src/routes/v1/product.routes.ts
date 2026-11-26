import { Router } from 'express';
import { ProductController } from '../../controllers/product.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js';
import { ProductFilterQuerySchema } from '@meghpiyon/shared';

export const productRouter = Router();

productRouter.get(
  '/',
  validateRequest({ query: ProductFilterQuerySchema }),
  ProductController.listProducts
);

productRouter.get('/:slug', ProductController.getProductBySlug);

productRouter.post(
  '/',
  requireAuth,
  requireRole('admin', 'employee', 'moderator'),
  ProductController.createProduct
);

productRouter.put(
  '/:id',
  requireAuth,
  requireRole('admin', 'employee', 'moderator'),
  ProductController.updateProduct
);

productRouter.delete(
  '/:id',
  requireAuth,
  requireRole('admin'),
  ProductController.deleteProduct
);
