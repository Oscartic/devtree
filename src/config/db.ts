import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.blue.italic(`Database connected en ${url}`));
  } catch (error) {
    console.error(colors.red.italic(error.message));
    process.exit(1); 
  }
};
