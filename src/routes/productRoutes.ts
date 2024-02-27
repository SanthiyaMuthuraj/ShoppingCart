// src/routes/productRoutes.ts

import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
  addProduct,
  getProductByName,
  getProductById,
  getProductsByPrice,
  updateProductByName,
  updateProductById,
  deleteProduct,
  getAllProducts
} from '../controllers/productController';

const router = express.Router();

router.post('/add', authenticateToken, addProduct);
router.get('/getByName/:name', authenticateToken, getProductByName);
router.get('/getById/:id', authenticateToken, getProductById);
router.get('/getByPrice/:price', authenticateToken, getProductsByPrice);
router.put('/updateByName/:name', authenticateToken, updateProductByName);
router.put('/updateById/:id', authenticateToken, updateProductById);
router.delete('/delete/:id', authenticateToken, deleteProduct);
router.get('/getAll', authenticateToken, getAllProducts);
export default router;
