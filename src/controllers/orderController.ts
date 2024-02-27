// src/controllers/orderController.ts

import { Request, Response } from 'express';
import OrderService from '../services/orderService';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const orderData = req.body;
    const order = await OrderService.placeOrder(userId, orderData);

    res.status(201).json({
      userId: order.userId,
      username: req.user?.username,
      products: order.items,
      totalAmount: order.totalAmount,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
