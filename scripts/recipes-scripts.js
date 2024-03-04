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
        publicationDate: "Feb 16, 2024",
        commentCount: 3,
        likeCount: 6
    }
];

const recipesSection = document.querySelector("#recipes-section");

function renderRecipes() {
    for (let recipe of recipes) {
        let recipeCard = `
        <div class="two-column-card recipe-card">
            <img src="${recipe.recipeImage}" alt="bread image">

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

renderRecipes();