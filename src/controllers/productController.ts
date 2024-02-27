// src/controllers/productController.ts

import { Request, Response } from 'express';
import ProductService from '../services/productService';
import { IOrderItem } from '../models/orderModel';
import { IProduct } from '../models/productModel'; 
export const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const productData = req.body;
    const newProduct = await ProductService.addProduct(userId, productData);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    let errorMessage = 'Internal Server Error';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
};
export const getProductByName = async (req: Request, res: Response) => {
  try {
    const productName = req.params.name;
    const product = await ProductService.getProductByName(productName);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error('Error getting product by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await ProductService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductsByPrice = async (req: Request, res: Response) => {
  try {
    const price = parseFloat(req.params.price);
    const products = await ProductService.getProductsByPrice(price);

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error getting products by price:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProductByName = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const productName = req.params.name;
    const updatedData = req.body;
    const updatedProduct = await ProductService.updateProductByName(userId, productName, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found or user not authorized' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product by name:', error);
    let errorMessage = 'Internal Server Error';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const productId = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await ProductService.updateProductById(userId, productId, updatedData);

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found or user not authorized' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product by ID:', error);
    let errorMessage = 'Internal Server Error';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const productId = req.params.id;
    const deletedProduct = await ProductService.deleteProduct(userId, productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found or user not authorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    let errorMessage = 'Internal Server Error';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
};
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};