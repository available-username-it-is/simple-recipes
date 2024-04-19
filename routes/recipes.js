const express = require("express");
const router = express.Router();

const { getAllRecipes, getRecipe, createRecipe } = require("../controllers/recipes");

router.route("/").get(getAllRecipes).post(createRecipe);
router.route("/:id").get(getRecipe);

module.exports = router;