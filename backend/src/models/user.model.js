import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 50, 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8, 
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false, 
    },
    photo: {
      type: String,
      default: "", 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema); 
export default User;
