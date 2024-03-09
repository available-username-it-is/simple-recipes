const recipes = [
    {
        recipeID: 1,
        recipeName: "Miracle no-knead bread",
        recipeImage: "assets/images/recipe-1-image.webp",
        recipeText: `Here is one of the most popular recipes 
                    The Times has ever published, courtesy of Jim Lahey, owner of Sullivan Street Bakery. 
                    It requires no kneading. 
                    It uses no special ingredients, equipment or techniques...`,
        ingredients: ["flour", "water", "yeast", "salt"],
        mealtime: "Dinner",
        userID: 1,
        publicationDate: "2025-02-16",
        commentCount: 3,
        likeCount: 6
    },
    {
        recipeID: 2,
        recipeName: "Edible Cookie Dough",
        recipeImage: "assets/images/recipe-2-image.webp",
        recipeText: `This edible cookie dough recipe is egg-free and 
                    will satisfy any cravings for chocolate chip cookies without the wait.  
                    I have made this with friends before and they said that they loved the taste....`,
        ingredients: ["flour", "water", "salt", "milk"],
        mealtime: "Snack",
        userID: 1,
        publicationDate: "2024-02-18",
        commentCount: 7,
        likeCount: 16
    },
    {
        recipeID: 3,
        recipeName: "Challah French Toast",
        recipeImage: "assets/images/recipe-3-image.webp",
        recipeText: `Challah is the best bread for French toast, bar none. 
                    It’s sturdy enough to stand up to its custard soak and 
                    a shower of maple syrup, yet tender and fluffy enough to cut with a fork.....`,
        ingredients: ["bread", "salt"],
        mealtime: "Breakfast",
        userID: 1,
        publicationDate: "2024-01-31",
        commentCount: 4,
        likeCount: 1
    }
];

const recipesSection = document.querySelector("#recipes-section");
function renderRecipes(recipes) {
    for (let recipe of recipes) {
        let recipeCard = `
        <div class="two-column-card recipe-card">
            <img src="${recipe.recipeImage}" alt="">

            <div class="text-column">
              <div class="user-info">
                <img src="assets/images/avatar.jpg">

                <div>
                    <p><b>Admin</b></p>
                    <p>${recipe.publicationDate}</p>
                </div>
              </div>

                <h3>${recipe.recipeName}</h3>

                <p>${recipe.recipeText}</p>

                <hr>
                <div class="card-footer">
                    <p>${recipe.commentCount} comments</p>
                    <p><span id="like-amount">${recipe.likeCount}</span><span class="heart-symbol">&#10084;</span></p>
                </div>
        </div>
      </div> 
    `;
        recipesSection.insertAdjacentHTML("beforeend", recipeCard);
    }

}

function sortByName(recipes) {
    return recipes.toSorted((a, b) => {
        if (a.recipeName > b.recipeName) {
            return 1;
        } else if (a.recipeName < b.recipeName) {
            return -1;
        } else {
            return 0;
        }
    });
}

function sortByDate(recipes) {
    return recipes.toSorted((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
}

let recipesToRender = sortByName(recipes);
renderRecipes(recipesToRender);

function getSearchResult(recipes, searchText) {
    return recipes.filter(recipe => recipe.recipeName.toLowerCase().includes(searchText.toLowerCase()));
}

// Searching recipes
const searchbar = document.getElementById("recipes-searchbar");
searchbar.addEventListener("input", (event) => {
    recipesToRender = getSearchResult(recipes, event.target.value); 
    
    recipesSection.innerHTML = "";
    renderRecipes(recipesToRender);
});


// Sorting recipes
const sortingSelect = document.getElementById("sorting-select");

sortingSelect.addEventListener("change", (event) => {
    if (sortingSelect.value === "AZ") {
        recipesToRender = sortByName(recipesToRender);
    } else if (sortingSelect.value === "ZA") {
        recipesToRender = sortByName(recipesToRender).toReversed();
    } else if (sortingSelect.value === "Date") {
        recipesToRender = sortByDate(recipesToRender);
    }
    recipesSection.innerHTML = "";
    renderRecipes(recipesToRender);
});


// Recipe filtering
const addNewIngredientButton = document.querySelectorAll(".new-ingredient-container span");
const ingredientsFilter = document.querySelectorAll(".ingredients-filter");
const applyFiltersButton = document.querySelectorAll(".apply-filters");
const chosenFiltersShow = document.querySelector(".filters-display");
const clearFiltersButton = document.getElementById('clear-filters');

addNewIngredientButton.forEach(button => {
    button.addEventListener("click", () => {
        const ingredientInput = button.nextElementSibling;
        addNewIngredient(ingredientInput);
    });
});

function addNewIngredient(ingredientInput) {
    if (ingredientInput.value.trim() !== "") {
        let ingredientCheckbox = `
            <li>
                <input type="checkbox" id="${ingredientInput.value}-filter" value=${ingredientInput.value.toLowerCase()}>
                <label for="${ingredientInput.value}-filter">${capitalize(ingredientInput.value)}</label>
            </li>
        `;
        ingredientsFilter.forEach(list => list.insertAdjacentHTML("afterbegin", ingredientCheckbox));
        ingredientInput.value = "";
        return ingredientCheckbox;
    }
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

applyFiltersButton.forEach(button => {
    button.addEventListener('click', () => {
        clearFiltersButton.style.display = "inline";
        const selectedFilters = getSelectedFilters();
        
        chosenFiltersShow.innerHTML = '';
        const { mealtimeFilters, ingredientsFilters } = selectedFilters;
        if (mealtimeFilters.length === 0 && ingredientsFilters.length === 0) {
            clearFiltersButton.style.display = "none";
        }

        for (let filters in selectedFilters) {
            
            for (let label of selectedFilters[filters]) {   
                
                const filterDisplayText = `
                    <div class="selected-filter">
                        <span>${capitalize(label)}</span>
                        <span class="material-symbols-outlined remove-filter">
                          close
                        </span>
                    </div>
                `;
                
                chosenFiltersShow.insertAdjacentHTML("beforeend", filterDisplayText);
            }
        }

        const filteredRecipes = filterRecipes(selectedFilters);
        if (filteredRecipes.length > 0) {
            recipesSection.innerHTML = "";
            recipesToRender = filteredRecipes;
            renderRecipes(recipesToRender);
        } else {
            recipesSection.innerHTML = "";
            const notification = `
                <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
            `;
            recipesSection.insertAdjacentHTML("beforeend", notification);
        }
    });
});

if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
        const filters = document.querySelectorAll(".filters-select input[type='checkbox']:checked");
        filters.forEach(filter => {
            filter.checked = false;
        })

        const selectedFilters = getSelectedFilters();

        if (selectedFilters['mealtimeFilters'].length === 0 && selectedFilters['ingredientsFilters'].length === 0) {
            clearFiltersButton.style.display = "none";
        }

        const filteredRecipes = filterRecipes(selectedFilters);

        if (filteredRecipes.length > 0) {
            recipesSection.innerHTML = "";
            recipesToRender = filteredRecipes;
            renderRecipes(recipesToRender);
        } else {
            recipesSection.innerHTML = "";
            const notification = `
                <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
            `;
            recipesSection.insertAdjacentHTML("beforeend", notification);
        }

        chosenFiltersShow.innerHTML = "";
    })
}

document.body.addEventListener("click", event => {
    if (event.target.classList.contains('remove-filter')) {
        const filterContainer = event.target.parentElement;
        const filterText = filterContainer.firstElementChild.innerHTML.toLowerCase();
        
        const mealtimeFilters = Array.from(document.querySelectorAll('.mealtime-filter input[type="checkbox"]:checked'));
        if (mealtimeFilters.length > 0) {
            const filterInput = mealtimeFilters.find(input => input.value.toLowerCase() === filterText);
            if (filterInput !== undefined) filterInput.checked = false; 
        }
        
        const ingredientsFilters = Array.from(document.querySelectorAll('.ingredients-filter input[type="checkbox"]:checked'));
        if (ingredientsFilters.length > 0) {
            const filterInput = ingredientsFilters.find(input => input.value.toLowerCase() === filterText);
            if (filterInput !== undefined) filterInput.checked = false; 
        }

        const selectedFilters = getSelectedFilters();

        if (selectedFilters['mealtimeFilters'].length === 0 && selectedFilters['ingredientsFilters'].length === 0) {
            clearFiltersButton.style.display = "none";
        }

        const filteredRecipes = filterRecipes(selectedFilters);

        if (filteredRecipes.length > 0) {
            recipesSection.innerHTML = "";
            recipesToRender = filteredRecipes;
            renderRecipes(recipesToRender);
        } else {
            recipesSection.innerHTML = "";
            const notification = `
                <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
            `;
            recipesSection.insertAdjacentHTML("beforeend", notification);
        }

        filterContainer.remove();
    }
})

function getSelectedFilters() {
    const mealtimeFilters = Array.from(document.querySelectorAll('.mealtime-filter input[type="checkbox"]:checked'))
                                .map(checkbox => checkbox.value.toLowerCase());
    const ingredientsFilters = Array.from(document.querySelectorAll('.ingredients-filter input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.value.toLowerCase());
    return { mealtimeFilters, ingredientsFilters };
}

function filterRecipes(filters) {
    const { mealtimeFilters, ingredientsFilters } = filters;
    return recipes.filter(recipe => {
        const passesMealtimeFilter = mealtimeFilters.length === 0 || mealtimeFilters.includes(recipe.mealtime.toLowerCase());
        const passesIngredientsFilter = ingredientsFilters.length === 0 || ingredientsFilters.some(ingredient => recipe.ingredients.includes(ingredient.toLowerCase()));
        return passesMealtimeFilter && passesIngredientsFilter;
    });
}

