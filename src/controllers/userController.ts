// src/controllers/userController.ts

import { Request, Response } from 'express';
import UserService from '../services/UserServices';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    console.error('Error registering user:', error);
    let errorMessage = 'Internal Server Error';

    if (error instanceof Error) {
            if (error.message.includes('phone number')) {
        errorMessage = 'Invalid phone number. It should be 10 digits.';
      } else if (error.message.includes('email')) {
        errorMessage = 'Invalid email address.';
      } else if (error.message.includes('Password must be at least')) {
        errorMessage = error.message; 
      }
    }
    res.status(500).json({ error: errorMessage });
  }
};

