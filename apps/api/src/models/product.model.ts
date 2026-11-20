import mongoose, { Document, Schema } from 'mongoose';
import { ProductCategory } from '@meghpiyon/shared';

export interface IProductDocument extends Document {
  name: string;
  nameBn?: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: ProductCategory;
  tags: string[];
  images: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  giftWrapAvailable: boolean;
  rating: number;
  reviewCount: number;
  attributes?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    nameBn: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        'customized',
        'chocolates',
        'flowers',
        'women-jewelry',
        'male-jewelry',
        'cake',
        'combo-pack',
        'gift-boxes',
        'handicrafts',
        'jewelry',
        'greeting-cards',
        'corporate-hampers',
      ],
      index: true,
    },
    tags: [{ type: String, trim: true }],
    images: [{ type: String, required: true }],
    isFeatured: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: true, index: true },
    giftWrapAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    attributes: { type: Map, of: String },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
