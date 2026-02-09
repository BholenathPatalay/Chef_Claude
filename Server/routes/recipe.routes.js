import express from "express";
import {
  generateRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
} from "../controllers/recipe.controller.js";
import { checkJwt } from "../middlewares/auth.js";

const router = express.Router();

router.post("/generate", checkJwt, generateRecipe);
router.get("/", checkJwt, getRecipes);
router.get("/:id", checkJwt, getRecipeById);
router.delete("/:id", checkJwt, deleteRecipe);

export default router;
