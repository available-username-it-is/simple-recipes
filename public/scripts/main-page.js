const recipesContainer = document.getElementById("recipes-section");

const showRecipes = async () => {
    const url = 'api/v1/recipes?sort=createdAt&limit=3';
    try {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"
        ];
        const { data } = await axios.get(url);
        const recipes = data.recipes;
        console.log(recipes);
        recipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            const date = new Date(recipe.createdAt);
            const month = months[date.getMonth()];
            const recipeID = recipe["_id"];
            
            recipeCard.innerHTML = `
            <div class="two-column-card recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}">
    
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

            recipesContainer.insertBefore(recipeCard, recipesContainer.lastElementChild);
        });

    } catch (error) {
        console.log(error);
    }
};

showRecipes();