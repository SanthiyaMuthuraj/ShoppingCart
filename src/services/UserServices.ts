// src\services\userService.ts

import UserModel, { IUser } from '../models/userModel';
import { validatePhoneNumber, validateEmail, validatePassword } from '../utils/validation';
import bcrypt from 'bcrypt';

class UserService {
  
  async registerUser(userData: IUser): Promise<IUser> {
    
    validatePhoneNumber(userData.phoneNumber);
    validateEmail(userData.email);
    validatePassword(userData.password);

    
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    
    const user = new UserModel({ ...userData, password: hashedPassword });
    await user.save();

    
    const { password, ...userWithoutPassword } = user.toObject();

    
    delete (userWithoutPassword as Partial<IUser>).password;

    return userWithoutPassword as IUser;
  }
}

export default new UserService();