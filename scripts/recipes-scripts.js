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
    return recipes.toSorted();
}

function sortByDate(recipes) {
    return recipes.toSorted((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
}

let sortedRecipes = sortByName(recipes).toReversed();
renderRecipes(sortedRecipes);
const sortingSelect = document.getElementById("sorting-select");

sortingSelect.addEventListener("change", () => {
    if (sortingSelect.value === "AZ") {
        sortedRecipes = sortByName(recipes).toReversed();
    } else if (sortingSelect.value === "ZA") {
        sortedRecipes = sortByName(recipes);
    } else if (sortingSelect.value === "Date") {
        sortedRecipes = sortByDate(recipes);
    }
    recipesSection.innerHTML = "";
    renderRecipes(sortedRecipes);

});