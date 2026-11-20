import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ProductModel } from '../models/product.model.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { AppError } from '../utils/appError.js';

export class ProductController {
  public static async listProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
      const skip = (page - 1) * limit;

      const filter: Record<string, any> = {};

      // If requested by admin or explicit showAll=true, don't filter by isAvailable
      if (req.query.showAll !== 'true') {
        filter.isAvailable = true;
      }

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

  public static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        nameBn,
        slug,
        price,
        discountPrice,
        stock,
        category,
        description,
        shortDescription,
        images,
        image,
        tags,
        isFeatured,
        isAvailable,
        giftWrapAvailable,
      } = req.body;

      if (!name || price === undefined) {
        throw new AppError('Name and price are required', 400);
      }

      // Generate or clean slug
      let finalSlug = slug
        ? String(slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      if (!finalSlug) finalSlug = `gift-${Date.now()}`;

      // Check slug collision
      const existing = await ProductModel.findOne({ slug: finalSlug });
      if (existing) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }

      // Normalize images
      const normalizedImages = Array.isArray(images) && images.length > 0
        ? images
        : [image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80'];

      const normalizedTags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : ['Curated'];

      const product = await ProductModel.create({
        name,
        nameBn: nameBn || '',
        slug: finalSlug,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock ?? 10),
        category: category || 'gift-boxes',
        description: description || shortDescription || `${name} - Handcrafted curated gift from Meghpeon`,
        shortDescription: shortDescription || description?.slice(0, 100),
        images: normalizedImages,
        tags: normalizedTags,
        isFeatured: Boolean(isFeatured),
        isAvailable: isAvailable !== false,
        giftWrapAvailable: giftWrapAvailable !== false,
        rating: 5,
        reviewCount: 0,
      });

      sendSuccess({
        res,
        statusCode: 201,
        message: 'Product created successfully',
        data: product,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Error creating product:', error);
      throw new AppError('Could not create product', 500);
    }
  }

  public static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const updates = { ...req.body };

      if (updates.image && (!updates.images || updates.images.length === 0)) {
        updates.images = [updates.image];
      }

      if (typeof updates.tags === 'string') {
        updates.tags = updates.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      }

      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
      const product = await ProductModel.findOneAndUpdate(query, { $set: updates }, { new: true });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Error updating product:', error);
      throw new AppError('Could not update product', 500);
    }
  }

  public static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };

      const product = await ProductModel.findOneAndDelete(query);
      if (!product) {
        throw new AppError('Product not found', 404);
      }

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Product deleted successfully',
        data: { id: product._id, slug: product.slug },
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Error deleting product:', error);
      throw new AppError('Could not delete product', 500);
    }
  }
}
