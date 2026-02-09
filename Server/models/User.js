import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
