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

const addInstructionButton = document.getElementById("add-instruction");
const instructionsList = document.getElementById("instructions-display");
const instructionInput = document.querySelector("#instructions-container input");
const instructions = [];
addInstructionButton.addEventListener("click", () => {
    if (instructionInput.value) {
        const instruction = instructionInput.value;
        instructions.push(instruction);
        const instructionLine = document.createElement("li");
        instructionLine.innerHTML = `
            <span>
                <span>${instruction}</span>
                <span class="material-symbols-outlined close-icon">
                    close
                </span>
            </span>
            `;
        instructionsList.appendChild(instructionLine);

        instructionInput.value = '';

        const closeIcon = instructionLine.querySelector(".close-icon");
        closeIcon.addEventListener("click", () => {
            const index = instructions.indexOf(instruction);
            if (index !== -1) {
                instructions.splice(index, 1);
            }
            instructionLine.remove();
        })
    }
})