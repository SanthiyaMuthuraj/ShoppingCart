// src/routes/userRoutes.ts

import express from 'express';
import { registerUser } from '../controllers/userController';
import { loginUser } from '../controllers/loginController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
