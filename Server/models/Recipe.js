import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Recipe", recipeSchema);
