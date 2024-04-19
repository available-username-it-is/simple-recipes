const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const recipeImageDOM = document.getElementById("recipe-image");
const recipeNameDOM = document.getElementById("recipe-name");
const recipeDescriptionDOM = document.getElementById("recipe-description");
const recipeIngredientsDOM = document.getElementById("recipe-ingredients");
const recipeTotalTimeDOM = document.getElementById("total-time");
const recipePrepTimeDOM = document.getElementById("prep-time");
const recipeCookTimeDOM = document.getElementById("cook-time");
const recipeInstructionsDOM = document.getElementById("recipe-instructions");
const recipeCaloriesDOM = document.getElementById("calories");
const recipeCarbsDOM = document.getElementById("carbs");
const recipeProteinsDOM = document.getElementById("proteins");
const recipeFatsDOM = document.getElementById("fats");

const getRecipe = async () => {
    try {
        const url = `api/v1/recipes/${id}`;
        const response = await axios.get(url);
        const recipe = response.data.recipe;
        renderRecipe(recipe);
    } catch (error) {
        console.log(error);
    }
};

const renderRecipe = (recipe) => {
    recipeImageDOM.src = recipe.image;
    recipeNameDOM.innerHTML = recipe.name;
    recipeDescriptionDOM.innerHTML = recipe.text;
    recipeTotalTimeDOM.innerHTML = "Approximately " + (recipe.prepTime + recipe.cookTime) + " minutes";
    recipePrepTimeDOM.innerHTML = recipe.prepTime + " minutes";
    recipeCookTimeDOM.innerHTML = recipe.cookTime + " minutes";
    recipeCaloriesDOM.innerHTML = recipe.nutrition.calories + "kcal";
    recipeCarbsDOM.innerHTML = recipe.nutrition.carbs + "g";
    recipeProteinsDOM.innerHTML = recipe.nutrition.proteins + "g";
    recipeFatsDOM.innerHTML = recipe.nutrition.fats + "g";

    recipe.ingredients.forEach(ingredient => {
        const element = `<li>${ingredient}</li>`;
        recipeIngredientsDOM.insertAdjacentHTML("beforeend", element);
    });

    recipe.instructions.forEach(instruction => {
        const element = `<li>${instruction}</li>`;
        recipeInstructionsDOM.insertAdjacentHTML("beforeend", element);
    });
} 

getRecipe();