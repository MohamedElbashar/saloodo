import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export async function connectToDatabase(uri: string): Promise<void> {
  try {
    if (!uri) {
      throw new Error('Database URI is not defined');
    }

    await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log(`✔✔✔✔ Connected To Db AT : ${new Date()}\n\n`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}
