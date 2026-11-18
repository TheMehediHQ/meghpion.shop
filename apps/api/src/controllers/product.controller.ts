import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { AppError } from '../utils/appError.js';

export class ProductController {
  public static async listProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
      const skip = (page - 1) * limit;

      const filter: Record<string, any> = { isAvailable: true };

      if (req.query.category && req.query.category !== 'all') {
        filter.category = req.query.category;
      }

      if (req.query.isFeatured !== undefined) {
        filter.isFeatured = String(req.query.isFeatured) === 'true';
      }

      if (req.query.search) {
        const searchRegex = new RegExp(String(req.query.search), 'i');
        filter.$or = [
          { name: searchRegex },
          { nameBn: searchRegex },
          { tags: searchRegex },
          { description: searchRegex },
        ];
      }

      const [items, total] = await Promise.all([
        ProductModel.find(filter)
          .sort({ isFeatured: -1, createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        ProductModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit);

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Products retrieved successfully',
        data: {
          items,
          pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
          filters: {
            category: req.query.category || 'all',
          },
        },
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new AppError('Could not retrieve product catalog', 500);
    }
  }

  public static async getProductBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const product = await ProductModel.findOne({ slug, isAvailable: true }).lean();

      if (!product) {
        throw new AppError(`Product with slug '${slug}' not found`, 404);
      }

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Product retrieved successfully',
        data: product,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Error fetching product by slug:', error);
      throw new AppError('Could not retrieve product details', 500);
    }
  }
}
