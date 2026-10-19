import { useState } from "react";
import GeminiRecipe from "./GeminiRecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromGPT } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeMarkdown, setRecipeMarkdown] = useState("");
  const [error, setError] = useState("");

  function submitIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();

    if (newIngredient) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  }

  async function generateRecipe() {
    setIsLoading(true);
    setError("");

    try {
      const generatedRecipe = await getRecipeFromGPT(ingredients);
      setRecipeMarkdown(generatedRecipe);
    } catch (error) {
      setError(error.message || "Failed to generate recipe.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <form action={submitIngredient} className="add-ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      {ingredients.length > 0 ? (
        <IngredientList getRecipe={generateRecipe} ingredients={ingredients} />
      ) : null}

      {isLoading && <p>Generating your recipe...</p>}

      {error && <p role="alert">{error}</p>}

      {recipeMarkdown && <GeminiRecipe response={recipeMarkdown} />}
    </main>
  );
}
