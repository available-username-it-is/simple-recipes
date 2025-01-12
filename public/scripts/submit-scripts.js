const addIngredientButton = document.querySelector("#add-ingredient");
const ingredientsList = document.getElementById("ingredients-display");
const ingredients = [];
const ingredientInput = document.getElementById("ingredient-input");
const amountInput = document.getElementById("amount-input");
const measurementInput = document.getElementById("measurement-input");
addIngredientButton.addEventListener("click", () => {
    
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

const recipeNameDOM = document.getElementById("recipe-name");
const recipeMealtimeDOM = document.getElementById("mealtime");
const recipeImageDOM = document.getElementById("image_uploads");
const recipeDescriptionDOM = document.getElementById("description");
const recipePrepHoursDOM = document.getElementById("prep-hours");
const recipePrepMinsDOM = document.getElementById("prep-mins");
const recipeCookHoursDOM = document.getElementById("cook-hours");
const recipeCookMinsDOM = document.getElementById("cook-mins");
const submitButtonDOM = document.getElementById("send-recipe");

let ingredientsArray = [];
submitButtonDOM.addEventListener("click", async () => {
    const prepTime = recipePrepHoursDOM.value * 60 + +recipePrepMinsDOM.value;
    const cookTime = recipeCookHoursDOM.value * 60 + +recipeCookMinsDOM.value;

    console.log(recipeImageDOM.files);
    let errors = false;
    if (ingredients.length > 0) {
        ingredientsArray = ingredients.map(ingredient => {
            return `${ingredient.ingredient} ${ingredient.amount} ${ingredient.measurement}`;
        });
    } else {
        errors = true;
        ingredientInput.style.border = "1px solid red";
        document.getElementById("ingredient-error").style.display = "inline";
        setTimeout(() => {
            ingredientInput.style.border = "none";
            document.getElementById("ingredient-error").style.display = "none";
        }, 5000);
    }

    if (instructions == false) {
        errors = true;
        instructionInput.style.border = "1px solid red";
        document.querySelector("#instructions-container .error-label").style.display = "inline";
        setTimeout(() => {
           instructionInput.style.border = "none";
           document.querySelector("#instructions-container .error-label").style.display = "none";
        }, 5000);
    }

    if (!errors) {
        const recipe = {
            name: recipeNameDOM.value,
            image: recipeImageDOM.value,  
            text: recipeDescriptionDOM.value,
            ingredients: ingredientsArray,
            mealtime: recipeMealtimeDOM.value,
            createdAt: Date.now(),
            prepTime,
            cookTime,
            instructions: instructions,
        };

        const url = `api/v1/recipes`;
        await axios.post(url, recipe);
    }
})