import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

mongoose.connection.on('error', (error) => {
  console.log(error);
});

export default connectDB;
