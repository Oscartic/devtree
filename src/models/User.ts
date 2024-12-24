import mongoose, { Schema } from "mongoose";

interface IUser {
  handle: string
  name: string
  email: string
  password: string
}

const userSchema = new Schema({
  handle: {
    type: String,
    required: [true, "Handle is required"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
    password: {
    type: String,
    required: [true, "Password is required"],
    trim:  true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
