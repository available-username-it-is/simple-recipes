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
        ingredients: ["flour", "water", "yeast", "salt"],
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
        ingredients: ["flour", "water", "yeast", "salt"],
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