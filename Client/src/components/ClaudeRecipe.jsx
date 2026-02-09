import React from "react";
import ReackMarkdown from "react-markdown";

const ClaudeRecipe = ({ recipe }) => {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <ReackMarkdown>{recipe.content}</ReackMarkdown>
    </section>
  );
};

export default ClaudeRecipe;
