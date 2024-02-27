// src/services/orderService.ts

import OrderModel, { IOrder, IOrderItem } from '../models/orderModel';
import CartService from './cartService';
import ProductService from './productService';

class OrderService {
  async placeOrder(userId: string, orderData: any): Promise<IOrder> {
    const { customerName, customerAddress, customerPhoneNumber, customerEmail, deliveryMode } = orderData;

    // Retrieve user's cart
    const cart = await CartService.getCartByUserId(userId);

    if (!cart) {
      throw new Error('User has no items in the cart');
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.productId.productPrice, 0);

    // Create order items
    const orderItems: IOrderItem[] = cart.items.map(item => ({
      productId: item.productId._id,
      productName: item.productName,
      quantity: item.quantity,
      productPrice: item.productId.productPrice, // Ensure productId is treated as an object
    }));

    // Create order
    const order: IOrder = await OrderModel.create({
      userId,
      customerName,
      customerAddress,
      customerPhoneNumber,
      customerEmail,
      deliveryMode,
      items: orderItems,
      totalAmount,
    });

    await CartService.clearCart(userId);

    return order;
  }
}

export default new OrderService();
