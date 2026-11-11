import { z } from 'zod';
import {
  ApiResponseSchema,
  ApiErrorResponseSchema,
  PaginationMetaSchema,
  PaginationQuerySchema,
  HealthCheckResponseSchema,
} from '../schemas/api.schema.js';
import {
  LoginSchema,
  RegisterSchema,
  UserProfileSchema,
  UserRoleSchema,
} from '../schemas/auth.schema.js';
import {
  ProductSchema,
  CreateProductSchema,
  ProductFilterQuerySchema,
  ProductCategoryEnum,
} from '../schemas/product.schema.js';
import {
  OrderSchema,
  OrderItemSchema,
  CreateOrderSchema,
  ShippingAddressSchema,
  TrackOrderQuerySchema,
  TrackingEventSchema,
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
  DivisionEnum,
} from '../schemas/order.schema.js';
import {
  ContactMessageSchema,
  NewsletterSubscribeSchema,
} from '../schemas/contact.schema.js';

// API
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
export interface PaginatedResult<T> {
  items: T[];
  pagination: PaginationMeta;
}

// Auth & User
export type UserRole = z.infer<typeof UserRoleSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;

// Products
export type ProductCategory = z.infer<typeof ProductCategoryEnum>;
export type Product = z.infer<typeof ProductSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type ProductFilterQuery = z.infer<typeof ProductFilterQuerySchema>;

// Cart
export interface CartItem {
  product: Product;
  quantity: number;
  giftWrap: boolean;
  giftMessage?: string;
  customText?: string;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  giftWrapTotal: number;
  estimatedDeliveryFee: number;
  discount: number;
  total: number;
}

// Orders
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;
export type Division = z.infer<typeof DivisionEnum>;
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type TrackOrderQuery = z.infer<typeof TrackOrderQuerySchema>;
export type TrackingEvent = z.infer<typeof TrackingEventSchema>;
export type Order = z.infer<typeof OrderSchema>;

// Contact & Newsletter
export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
export type NewsletterSubscribeInput = z.infer<typeof NewsletterSubscribeSchema>;
