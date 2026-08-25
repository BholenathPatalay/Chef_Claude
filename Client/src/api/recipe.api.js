import { useCallback } from "react";
import { useAuthAxios } from "./useAuthAxios";

export function useRecipeApi() {
  const api = useAuthAxios();

  const generateRecipe = useCallback(
    async (ingredients) => {
      const res = await api.post("/api/recipes/generate", {
        ingredients,
      });

      return res.data;
    },
    [api],
  );

  const fetchRecipes = useCallback(async () => {
    const res = await api.get("/api/recipes");
    return res.data;
  }, [api]);

  const fetchRecipeById = useCallback(
    async (id) => {
      const res = await api.get(`/api/recipes/${id}`);
      return res.data;
    },
    [api],
  );

  const deleteRecipe = useCallback(
    async (id) => {
      const res = await api.delete(`/api/recipes/${id}`);
      return res.data;
    },
    [api],
  );

  return {
    generateRecipe,
    fetchRecipes,
    fetchRecipeById,
    deleteRecipe,
  };
}
