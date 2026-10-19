const API_URL = import.meta.env.VITE_API_URL;

export async function getRecipeFromGPT(ingredientsArr) {
  const response = await fetch(`${API_URL}/api/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsArr,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate recipe");
  }

  return data.recipe;
}
