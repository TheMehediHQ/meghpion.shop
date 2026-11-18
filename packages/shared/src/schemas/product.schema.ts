import { z } from 'zod';
import { PaginationQuerySchema } from './api.schema.js';

export const ProductCategoryEnum = z.enum([
  'gift-boxes',
  'customized',
  'handicrafts',
  'chocolates',
  'flowers',
  'jewelry',
  'greeting-cards',
  'corporate-hampers',
]);

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  nameBn: z.string().optional(),
  slug: z.string().min(2),
  description: z.string(),
  shortDescription: z.string().optional(),
  price: z.number().positive(),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative().default(0),
  category: ProductCategoryEnum,
  tags: z.array(z.string()).default([]),
  images: z.array(z.string().url()).min(1),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  giftWrapAvailable: z.boolean().default(true),
  rating: z.number().min(0).max(5).default(5),
  reviewCount: z.number().int().nonnegative().default(0),
  attributes: z.record(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  nameBn: z.string().optional(),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  discountPrice: z.number().positive().optional(),
  stock: z.number().int().nonnegative().default(0),
  category: ProductCategoryEnum,
  tags: z.array(z.string()).default([]),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  giftWrapAvailable: z.boolean().default(true),
  attributes: z.record(z.string()).optional(),
});

export const ProductFilterQuerySchema = PaginationQuerySchema.extend({
  category: ProductCategoryEnum.optional(),
  search: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  isFeatured: z.coerce.boolean().optional(),
  inStockOnly: z.coerce.boolean().optional(),
});
