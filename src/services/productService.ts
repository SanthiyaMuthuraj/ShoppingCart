// src/services/productService.ts

import ProductModel, { IProduct } from '../models/productModel';
import UserModel from '../models/userModel';
import { IOrderItem } from '../models/orderModel';


class ProductService {
  async addProduct(userId: string, productData: IProduct): Promise<IProduct> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'seller') {
      throw new Error('Only sellers can add products');
    }

    const newProduct = new ProductModel(productData);
    await newProduct.save();
    return newProduct;
  }
  async getProductByName(productName: string): Promise<IProduct | null> {
    const product = await ProductModel.findOne({ productName });
    return product;
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    const product = await ProductModel.findById(productId);
    return product;
  }

  async getProductsByPrice(price: number): Promise<IProduct[]> {
    const products = await ProductModel.find({ productPrice: price });
    return products;
  }

  async updateProductByName(userId: string, productName: string, updatedData: Partial<IProduct>): Promise<IProduct | null> {
    const user = await UserModel.findById(userId);

    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can update products');
    }

    const product = await ProductModel.findOneAndUpdate(
      { productName },
      { $set: updatedData },
      { new: true }
    );

    return product;
  }

  async updateProductById(userId: string, productId: string, updatedData: Partial<IProduct>): Promise<IProduct | null> {
    const user = await UserModel.findById(userId);

    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can update products');
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );

    return product;
  }

  async deleteProduct(userId: string, productId: string): Promise<IProduct | null> {
    const user = await UserModel.findById(userId);

    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can delete products');
    }

    const product = await ProductModel.findByIdAndDelete(productId);
    return product;
  }
  async getAllProducts(): Promise<IProduct[]> {
    const products = await ProductModel.find();
    return products;
  }
  async updateProductStock(orderItems: IOrderItem[]): Promise<void> {
    try {
      await Promise.all(orderItems.map(async (item) => {
        const { productId, quantity } = item;
  
        const product = await ProductModel.findById(productId);
  
        if (!product) {
          console.error(`Product with ID ${productId} not found`);
          return;
        }
  
        if (product.productStock < quantity) {
          console.error(`Insufficient stock for product ${product.productName}`);
          return;
        }
  
        
        await ProductModel.findByIdAndUpdate(
          productId,
          { $inc: { productStock: product.productStock - quantity } },
          { new: true }
        );
      }));
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw new Error('Internal Server Error');
    }
  }

}


export default new ProductService();
