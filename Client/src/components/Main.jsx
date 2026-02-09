import { useState } from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import { useRecipeApi } from "../api/recipe.api";
import { useAuth0 } from "@auth0/auth0-react";

export default function Main({ currentRecipe, setCurrentRecipe, setRecipes }) {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const { isAuthenticated, loginWithPopup } = useAuth0();
  const { generateRecipe } = useRecipeApi();

  function addIngredients(formData) {
    const value = formData.get("ingredient")?.trim();
    if (!value) return;

    setIngredients((prev) => [...prev, { id: crypto.randomUUID(), value }]);
  }

  function deleteIngredient(id) {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  }

  function updateIngredient(id, value) {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  }

  async function getRecipe() {
    if (!isAuthenticated) {
      loginWithPopup();
      return;
    }

    setLoading(true);
    try {
      const recipe = await generateRecipe(ingredients.map((i) => i.value));
      setCurrentRecipe(recipe);
      setRecipes((prev) => [recipe, ...prev]);
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main-content">
      <form
        className="add-ingredient-form"
        onSubmit={(e) => {
          e.preventDefault();
          addIngredients(new FormData(e.currentTarget));
          e.currentTarget.reset();
        }}
      >
        <input type="text" placeholder="e.g. oregano" name="ingredient" />
        <button type="submit">Add ingredient</button>
      </form>

      <IngredientList
        ingredients={ingredients}
        getRecipe={getRecipe}
        loading={loading}
        onDelete={deleteIngredient}
        onEdit={updateIngredient}
      />

      {currentRecipe && <ClaudeRecipe recipe={currentRecipe} />}
    </main>
  );
}
