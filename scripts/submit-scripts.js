const addIngredientButton = document.querySelector("#add-ingredient");
const ingredientsList = document.getElementById("ingredients-display");
const ingredients = [];
addIngredientButton.addEventListener("click", () => {
    const ingredientInput = document.getElementById("ingredient-input");
    const amountInput = document.getElementById("amount-input");
    const measurementInput = document.getElementById("measurement-input");

    const ingredient = {
        ingredient: ingredientInput.value,
        amount: amountInput.value,
        measurement: measurementInput.value
    };
    ingredients.push(ingredient);
    
    
    const ingredientLine = document.createElement("li");
    ingredientLine.innerHTML = `
        <span><b>${ingredient.amount} ${ingredient.measurement}</b></span>
        <span>${ingredient.ingredient}</span>
        <span class="material-symbols-outlined">
            close
        </span>
    `
    ingredientsList.appendChild(ingredientLine); 

    ingredientInput.value = "";
    amountInput.value = "";
    measurementInput.value = "";
})