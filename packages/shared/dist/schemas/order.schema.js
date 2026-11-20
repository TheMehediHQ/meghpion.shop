import { z } from 'zod';
import { BD_DIVISIONS, ORDER_STATUSES, PAYMENT_METHODS, PAYMENT_STATUSES } from '../constants/index.js';
import { BangladeshiPhoneRegex } from './auth.schema.js';
export const OrderStatusEnum = z.enum(ORDER_STATUSES);
export const PaymentStatusEnum = z.enum(PAYMENT_STATUSES);
export const PaymentMethodEnum = z.enum(PAYMENT_METHODS);
export const DivisionEnum = z.enum(BD_DIVISIONS);
export const ShippingAddressSchema = z.object({
    fullName: z.string().min(2, 'Full name is required').trim(),
    phone: z
        .string()
        .regex(BangladeshiPhoneRegex, 'Valid Bangladeshi phone number is required'),
    alternativePhone: z
        .string()
        .regex(BangladeshiPhoneRegex, 'Alternative phone must be valid')
        .optional()
        .or(z.literal('')),
    division: DivisionEnum,
    district: z.string().min(2, 'District is required').trim(),
    addressLine: z.string().min(5, 'Detailed street address is required').trim(),
    postalCode: z.string().optional(),
    deliveryNotes: z.string().max(250).optional(),
});
export const OrderItemSchema = z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive().default(1),
    image: z.string().optional(),
    giftWrap: z.boolean().default(false),
    giftMessage: z.string().max(300).optional(),
    customText: z.string().max(100).optional(),
});
export const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item'),
    shippingAddress: ShippingAddressSchema,
    paymentMethod: PaymentMethodEnum,
    giftWrap: z.boolean().default(false),
    giftNote: z.string().max(500).optional(),
    couponCode: z.string().optional(),
});
export const TrackOrderQuerySchema = z.object({
    orderNumber: z.string().min(4, 'Valid order number is required').trim(),
    phone: z
        .string()
        .regex(BangladeshiPhoneRegex, 'Valid phone number is required')
        .optional(),
});
export const TrackingEventSchema = z.object({
    status: OrderStatusEnum,
    timestamp: z.string(),
    description: z.string(),
    location: z.string().optional(),
});
export const OrderSchema = z.object({
    id: z.string(),
    orderNumber: z.string(),
    userId: z.string().optional(),
    items: z.array(OrderItemSchema),
    shippingAddress: ShippingAddressSchema,
    paymentMethod: PaymentMethodEnum,
    paymentStatus: PaymentStatusEnum,
    orderStatus: OrderStatusEnum,
    subtotal: z.number().nonnegative(),
    deliveryFee: z.number().nonnegative(),
    discount: z.number().nonnegative().default(0),
    giftWrapFee: z.number().nonnegative().default(0),
    total: z.number().nonnegative(),
    timeline: z.array(TrackingEventSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
});
