// src/models/productModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  productPrice: number;
  productStock: number;
  productDescription: string;
}

const productSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productStock: { type: Number, required: true },
  productDescription: { type: String, required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);
