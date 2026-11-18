import mongoose, { Document, Schema } from 'mongoose';
import {
  BD_DIVISIONS,
  ORDER_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Division,
} from '@meghpiyon/shared';

export interface IOrderDocument extends Document {
  orderNumber: string;
  userId?: mongoose.Types.ObjectId;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    giftWrap: boolean;
    giftMessage?: string;
    customText?: string;
  }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    alternativePhone?: string;
    division: Division;
    district: string;
    addressLine: string;
    postalCode?: string;
    deliveryNotes?: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  giftWrapFee: number;
  total: number;
  timeline: Array<{
    status: OrderStatus;
    timestamp: Date;
    description: string;
    location?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image: { type: String },
        giftWrap: { type: Boolean, default: false },
        giftMessage: { type: String },
        customText: { type: String },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      alternativePhone: { type: String },
      division: { type: String, enum: BD_DIVISIONS, required: true },
      district: { type: String, required: true },
      addressLine: { type: String, required: true },
      postalCode: { type: String },
      deliveryNotes: { type: String },
    },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: 'pending' },
    orderStatus: { type: String, enum: ORDER_STATUSES, default: 'pending', index: true },
    subtotal: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    giftWrapFee: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    timeline: [
      {
        status: { type: String, enum: ORDER_STATUSES, required: true },
        timestamp: { type: Date, default: Date.now },
        description: { type: String, required: true },
        location: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);
