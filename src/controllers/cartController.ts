// src/controllers/cartController.ts

import { Request, Response } from 'express';
import CartService from '../services/cartService';
import { ICartItem } from '../models/cartModel'; 

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { productId, productName, quantity } = req.body;

   
    const cartItemData: Partial<ICartItem> = {
      productId: productId, 
      productName: productName, 
      quantity: quantity, 
    };

    await CartService.addToCart(userId, cartItemData as ICartItem);

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
