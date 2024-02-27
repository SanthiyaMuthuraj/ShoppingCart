// src/services/cartService.ts

import CartModel, { ICart, ICartItem } from '../models/cartModel';

class CartService {
  async addToCart(userId: string, item: ICartItem): Promise<void> {
    await CartModel.findOneAndUpdate(
      { userId },
      { $push: { items: item } },
      { upsert: true }
    );
  }
  async getCartByUserId(userId: string): Promise<ICart | null> {
    const cart = await CartModel.findOne({ userId }).populate('items.productId');
    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    await CartModel.findOneAndUpdate({ userId }, { $set: { items: [] } });
  }
}


export default new CartService();
