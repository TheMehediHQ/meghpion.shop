import { Router } from 'express';
import { ProductController } from '../../controllers/product.controller.js';
import { validateRequest } from '../../middleware/validate.middleware.js';
import { ProductFilterQuerySchema } from '@meghpiyon/shared';

export const productRouter = Router();

productRouter.get(
  '/',
  validateRequest({ query: ProductFilterQuerySchema }),
  ProductController.listProducts
);

productRouter.get('/:slug', ProductController.getProductBySlug);

productRouter.post('/', ProductController.createProduct);

productRouter.put('/:id', ProductController.updateProduct);

productRouter.delete('/:id', ProductController.deleteProduct);
