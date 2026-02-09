import { useState } from "react";
import { SquarePen, Trash, SquareCheck } from "lucide-react";

export default function IngredientList({
  ingredients,
  getRecipe,
  loading,
  onDelete,
  onEdit,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  return (
    <section>
      <h2>Ingredients on hand:</h2>

      {ingredients.length === 0 && (
        <div className="get-recipe-container">
          <div>
            <h3>Add ingredients to get started</h3>
            <p>Add at least 3 ingredients to generate a recipe.</p>
          </div>
          <button className="get-recipe-btn" disabled>
            Get a Recipe
          </button>
        </div>
      )}

      {/* Ingredient list */}
      {ingredients.length > 0 && (
        <ul className="ingredients-lists" aria-live="polite">
          {ingredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-item">
              {editingId === ingredient.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="list-btns"
                    onClick={() => {
                      onEdit(ingredient.id, editValue.trim());
                      setEditingId(null);
                    }}
                  >
                    <SquareCheck size={15} />
                  </button>
                </>
              ) : (
                <>
                  <span>{ingredient.value}</span>

                  <button
                    className="list-btns"
                    onClick={() => {
                      setEditingId(ingredient.id);
                      setEditValue(ingredient.value);
                    }}
                  >
                    <SquarePen size={15} />
                  </button>

                  <button
                    className="list-btns"
                    onClick={() => onDelete(ingredient.id)}
                  >
                    <Trash size={15} />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {ingredients.length > 0 && ingredients.length < 3 && (
        <div className="get-recipe-container">
          <p className="hint">
            Add {3 - ingredients.length} more ingredient
            {3 - ingredients.length > 1 ? "s" : ""} to generate a recipe.
          </p>
        </div>
      )}

      {ingredients.length >= 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button
            onClick={getRecipe}
            className="get-recipe-btn"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get a Recipe"}
          </button>
        </div>
      )}
    </section>
  );
}
