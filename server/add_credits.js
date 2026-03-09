import mongoose from 'mongoose';
import UserModel from './models/user.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

async function addCredits() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    
    // Adding 100 credits to all users for testing
    const result = await UserModel.updateMany(
      {}, 
      { 
        $inc: { credits: 100 },
        $set: { isCreditAvailable: true }
      }
    );
    
    console.log(`Successfully added 100 credits to ${result.modifiedCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error("Error adding credits:", error);
    process.exit(1);
  }
}

addCredits();
