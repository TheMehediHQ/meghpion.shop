import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';

export class OrderController {
  public static async createOrder(req: Request, res: Response): Promise<void> {
    const { items, shippingAddress, paymentMethod } = req.body;

    const dummyOrderNumber = `MP-${Date.now().toString(36).toUpperCase()}`;

    sendSuccess({
      res,
      statusCode: 201,
      message: 'Order creation foundation ready',
      data: {
        orderNumber: dummyOrderNumber,
        itemsCount: items.length,
        shippingTo: shippingAddress.fullName,
        paymentMethod,
        orderStatus: 'pending',
      },
    });
  }

  public static async trackOrder(req: Request, res: Response): Promise<void> {
    const { orderNumber } = req.params;

    sendSuccess({
      res,
      statusCode: 200,
      message: 'Order tracking foundation ready',
      data: {
        orderNumber,
        status: 'pending',
        timeline: [
          {
            status: 'pending',
            timestamp: new Date().toISOString(),
            description: 'Order placed and waiting for verification',
            location: 'Dhaka Hub',
          },
        ],
      },
    });
  }
}
