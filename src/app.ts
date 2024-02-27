import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; 
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';


const app = express();


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
 
})
.then(() => {
  console.log('Database Connected!');
})
.catch((err) => {
  console.error('Database Connection Error:', err);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/product',productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

export default app;
