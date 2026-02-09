import Recipe from "../models/Recipe.js";
import groq from "../config/groq.js";
import SYSTEM_PROMPT from "../prompts/recipePrompt.js";

export const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;
    const userId = req.auth.payload.sub;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Create a recipe using these ingredients: ${ingredients.join(
            ", ",
          )}`,
        },
      ],
    });

    const content = response.choices[0].message.content;

    const titleMatch = content.match(/^##\s+(.*)$/m);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled Recipe";

    const cleanContent = content.replace(/<[^>]*>/g, "");

    const recipe = await Recipe.create({
      title,
      ingredients,
      content: cleanContent,
      user: userId,
    });

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    const recipes = await Recipe.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("title createdAt");

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    const recipe = await Recipe.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    const { id } = req.params;

    const deleteRecipe = await Recipe.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deleteRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
