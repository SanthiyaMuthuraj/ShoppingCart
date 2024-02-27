// src\models\userModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  phoneNumber: string;
  userId: string;
  age: number;
  location: string;
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), required: true, unique: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'seller'], required: true },
});

export default mongoose.model<IUser>('User', userSchema);