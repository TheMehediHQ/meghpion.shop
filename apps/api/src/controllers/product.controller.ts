import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';

export class ProductController {
  public static async listProducts(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 12, category } = req.query;

    sendSuccess({
      res,
      statusCode: 200,
      message: 'Product catalog endpoint ready',
      data: {
        items: [],
        pagination: {
          total: 0,
          page: Number(page),
          limit: Number(limit),
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
        filters: { category },
      },
    });
  }

  public static async getProductBySlug(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;

    sendSuccess({
      res,
      statusCode: 200,
      message: 'Product details endpoint ready',
      data: {
        slug,
        status: 'ready',
      },
    });
  }
}
