// src/routes/cartRoutes.ts

import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { addToCart} from '../controllers/cartController';

const router = express.Router();

router.post('/add', authenticateToken, addToCart);


export default router;
