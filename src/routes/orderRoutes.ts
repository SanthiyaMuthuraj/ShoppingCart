// src/routes/orderRoutes.ts

import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { placeOrder } from '../controllers/orderController';

const router = express.Router();

router.post('/place', authenticateToken, placeOrder);

export default router;
