import mongoose from 'mongoose';
import UserModel from './models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const users = await UserModel.find({});
  users.forEach(u => console.log(`User: ${u.email}, Credits: ${u.credits}`));
  process.exit(0);
});
