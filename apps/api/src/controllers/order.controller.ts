import { Request, Response } from 'express';
import { OrderModel } from '../models/order.model.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { AppError } from '../utils/appError.js';

export class OrderController {
  public static async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { items, shippingAddress, paymentMethod, giftWrap, giftNote } = req.body;

      // Calculate totals
      const subtotal = items.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0);
      const deliveryFee = 80;
      const giftWrapFee = giftWrap ? 100 : 0;
      const total = subtotal + deliveryFee + giftWrapFee;

      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const orderNumber = `MP-${randomSuffix}`;

      const timeline = [
        {
          status: 'pending' as const,
          timestamp: new Date(),
          description: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে ও ভেরিফিকেশনের অপেক্ষায় আছে',
          location: 'Dhaka Central Hub',
        },
      ];

      const order = await OrderModel.create({
        orderNumber,
        items,
        shippingAddress,
        paymentMethod,
        paymentStatus: 'pending',
        orderStatus: 'pending',
        subtotal,
        deliveryFee,
        giftWrapFee,
        discount: 0,
        total,
        timeline,
      });

      sendSuccess({
        res,
        statusCode: 201,
        message: 'Order placed successfully',
        data: order,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw new AppError('Could not process order placement', 500);
    }
  }

  public static async trackOrder(req: Request, res: Response): Promise<void> {
    try {
      const { orderNumber } = req.params;
      const order = await OrderModel.findOne({ orderNumber }).lean();

      if (!order) {
        throw new AppError(`Order '${orderNumber}' not found`, 404);
      }

      sendSuccess({
        res,
        statusCode: 200,
        message: 'Order tracking details retrieved',
        data: order,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;
      console.error('Error tracking order:', error);
      throw new AppError('Could not retrieve tracking details', 500);
    }
  }
}
