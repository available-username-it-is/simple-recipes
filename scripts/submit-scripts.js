const addIngredientButton = document.querySelector("#add-ingredient");
const ingredientsList = document.getElementById("ingredients-display");
const ingredients = [];
addIngredientButton.addEventListener("click", () => {
    const ingredientInput = document.getElementById("ingredient-input");
    const amountInput = document.getElementById("amount-input");
    const measurementInput = document.getElementById("measurement-input");
    
    if (ingredientInput.value && amountInput.value) {
        const ingredient = {
            ingredient: ingredientInput.value,
            amount: amountInput.value,
            measurement: measurementInput.value
        };
        ingredients.push(ingredient);
        
        const ingredientLine = document.createElement("li");
        ingredientLine.innerHTML = `
            <span>${ingredient.ingredient}</span>
            <span><b>${ingredient.amount} ${ingredient.measurement}</b></span>
            <span class="material-symbols-outlined close-icon">
                close
            </span>
        `;
        ingredientsList.appendChild(ingredientLine); 
    
        ingredientInput.value = "";
        amountInput.value = "";
        measurementInput.value = "";

        const closeIcon = ingredientLine.querySelector(".close-icon");
        closeIcon.addEventListener("click", () => {
            const index = ingredients.indexOf(ingredient);
            if (index !== -1) {
                ingredients.splice(index, 1);
            }
            ingredientLine.remove();
        });
    }
})
