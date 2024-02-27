// src/models/cartModel.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './productModel';

export interface ICartItem extends Document {
  productId: IProduct; 
  productName: string;
  quantity: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
}

const cartItemSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema],
});

export default mongoose.model<ICart>('Cart', cartSchema);
