// E:\ShoppingCart\src\utils\validation.ts
export const validatePhoneNumber = (phoneNumber: string): void => {
    const phoneRegex = /^\d{10}$/; 
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error('Invalid phone number. It should be 10 digits.');
    }
  };
  
  export const validateEmail = (email: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address.');
    }
  };
  
  export const validatePassword = (password: string): void => {
    const minLength = 8;
    if (password.length < minLength) {
      throw new Error(`Password must be at least ${minLength} characters long.`);
    }
  };
  