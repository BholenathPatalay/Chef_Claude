import { useAuthAxios } from "./useAuthAxios";

export function useRecipeApi() {
  const api = useAuthAxios();

  async function generateRecipe(ingredients) {
    const res = await api.post("/recipes/generate", {
      ingredients,
    });

    return res.data;
  }

  async function fetchRecipes() {
    const res = await api.get("/recipes");
    return res.data;
  }

  async function fetchRecipeById(id) {
    const res = await api.get(`/recipes/${id}`);
    return res.data;
  }

  async function deleteRecipe(id) {
    const res = await api.delete(`/recipes/${id}`);
    return res.data;
  }

  return {
    generateRecipe,
    fetchRecipes,
    fetchRecipeById,
    deleteRecipe,
  };
}
