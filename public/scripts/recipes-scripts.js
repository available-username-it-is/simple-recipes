let queryParams = {};

const url = `api/v1/recipes`;
const getRecipes = async (url) => {
    try {
        const { data } = await axios.get(url);
        const recipes = data.recipes;

        renderRecipes(recipes);
    } catch (error) {
        console.log(error);
    }
};

const recipesSection = document.querySelector("#recipes-section");
function renderRecipes(recipes) {
    if (recipes.length === 0) {
        const notification = `
        <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
        `;
        recipesSection.insertAdjacentHTML("beforeend", notification);
    }
    for (let recipe of recipes) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"
        ];

        const date = new Date(recipe.createdAt);
        const month = months[date.getMonth()];
        const recipeID = recipe["_id"];

        let recipeCard = `
        <div class="two-column-card recipe-card">
            <img src="${recipe.image}" alt="">

            <div class="text-column">
              <div class="user-info">
                <img src="assets/images/avatar.jpg">

                <div>
                    <p><b>Admin</b></p>
                    <p>${month} ${date.getDate()}, ${date.getFullYear()}</p>
                </div>
              </div>

                <h3><a href=recipe.html?id=${recipeID}>${recipe.name}</a></h3>

                <p>${recipe.text}</p>

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

getRecipes(url);

const updateQueryParams = (newParams) => {
    queryParams = { ...queryParams, ...newParams };
}

const buildQueryString = () => {
    const queryString = Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join("&");
    return queryString;
};

function sortByName(order) {
    updateQueryParams({ sort: order });
    const url = `api/v1/recipes?${buildQueryString()}`;
    getRecipes(url);
}

function sortByDate(order) {
    updateQueryParams({ sort: order });
    const url = `api/v1/recipes?${buildQueryString()}`;
    getRecipes(url);
}

function searchRecipes(searchText) {
    updateQueryParams({ name: searchText });
    const url = `api/v1/recipes?${buildQueryString()}`;
    getRecipes(url);
}

// Searching recipes
let timerID;
const searchbar = document.getElementById("recipes-searchbar");
searchbar.addEventListener("input", (event) => { 
    clearTimeout(timerID);
    timerID = setTimeout(() => {
        recipesSection.innerHTML = "";
        searchRecipes(event.target.value); 
    }, 300);
});


// Sorting recipes
const sortingSelect = document.getElementById("sorting-select");

sortingSelect.addEventListener("change", (event) => {
    if (sortingSelect.value === "AZ") {
        recipesSection.innerHTML = "";
        sortByName("name");
    } else if (sortingSelect.value === "ZA") {
        recipesSection.innerHTML = "";
        sortByName("-name")
    } else if (sortingSelect.value === "Date") {
        recipesSection.innerHTML = "";
        sortByDate("date");
    }
});


// Recipe filtering
const addNewIngredientButton = document.querySelectorAll(".new-ingredient-container span");
const ingredientsFilter = document.querySelectorAll(".ingredients-filter");
const applyFiltersButton = document.querySelectorAll(".apply-filters");
const chosenFiltersShow = document.querySelector(".filters-display");
const clearFiltersButton = document.getElementById('clear-filters');

function getSelectedFilters() {
    const mealtimeFilters = Array.from(document.querySelectorAll('.mealtime-filter input[type="checkbox"]:checked'))
                                .map(checkbox => checkbox.value.toLowerCase());
    const ingredientsFilters = Array.from(document.querySelectorAll('.ingredients-filter input[type="checkbox"]:checked'))
                                    .map(checkbox => checkbox.value.toLowerCase());
    return { mealtimeFilters, ingredientsFilters };
}

function filterRecipes(filters) {
    const { mealtimeFilters, ingredientsFilters } = filters;
    const mealtimeParams = mealtimeFilters.join(",");
    const ingredientsParams = ingredientsFilters.join(",");
    updateQueryParams({ mealtime: mealtimeParams, ingredients: ingredientsParams });
    const url = `api/v1/recipes?${buildQueryString()}`;
    getRecipes(url);
}

const renderFiltersLabels = (selectedFilters) => {
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
}

applyFiltersButton.forEach(button => {
    button.addEventListener("click", () => {
        recipesSection.innerHTML = "";
        filterRecipes(getSelectedFilters());

        clearFiltersButton.style.display = "inline";
        const selectedFilters = getSelectedFilters();
        chosenFiltersShow.innerHTML = '';
        const { mealtimeFilters, ingredientsFilters } = selectedFilters;
        if (mealtimeFilters.length === 0 && ingredientsFilters.length === 0) {
            clearFiltersButton.style.display = "none";
        }

        renderFiltersLabels(selectedFilters);
    });
});

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

        recipesSection.innerHTML = "";
        filterRecipes(selectedFilters);

        // if (filteredRecipes.length > 0) {
        //     recipesToRender = filteredRecipes;
        //     renderRecipes(recipesToRender);
        // } else {
        //     recipesSection.innerHTML = "";
        //     const notification = `
        //         <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
        //     `;
        //     recipesSection.insertAdjacentHTML("beforeend", notification);
        // }

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

        recipesSection.innerHTML = "";
        const selectedFilters = getSelectedFilters();

        if (selectedFilters['mealtimeFilters'].length === 0 && selectedFilters['ingredientsFilters'].length === 0) {
            clearFiltersButton.style.display = "none";
        }

        filterRecipes(selectedFilters);

        // if (filteredRecipes.length > 0) {
        //     recipesToRender = filteredRecipes;
        //     renderRecipes(recipesToRender);
        // } else {
        //     recipesSection.innerHTML = "";
        //     const notification = `
        //         <p style='font-size: 1.5rem; text-align: center;'>No recipes found</p>
        //     `;
        //     recipesSection.insertAdjacentHTML("beforeend", notification);
        // }

        filterContainer.remove();
    }
})
