// src/models/orderModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  productPrice: number;
}

export interface IOrder extends Document {
  userId: string;
  customerName: string;
  customerAddress: string;
  customerPhoneNumber: string;
  customerEmail: string;
  deliveryMode: string; // Should be 'cod' or 'op'
  items: IOrderItem[];
  totalAmount: number;
}

const orderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerPhoneNumber: { type: String, required: true },
  customerEmail: { type: String, required: true },
  deliveryMode: { type: String, enum: ['cod', 'op'], required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      productPrice: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
});

export default mongoose.model<IOrder>('Order', orderSchema);
