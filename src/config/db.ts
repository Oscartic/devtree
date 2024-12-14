import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(`Database connected en ${url}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1); 
  }
};
