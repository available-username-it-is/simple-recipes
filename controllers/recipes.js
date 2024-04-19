const { query } = require("express");
const Recipe = require("../models/Recipe");

const getAllRecipes = async (req, res) => {
    try {
        const { sort, name, mealtime, ingredients } = req.query;
        const queryObject = {};

        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        if (mealtime) {
            queryObject.mealtime = { $in: mealtime.split(",") };
        }

        if (ingredients) {
            queryObject.ingredients = { $in: ingredients.split(",") };
        }

        let result = Recipe.find(queryObject);

        if (sort) {
            const sortList = sort.split(",").join(" ");
            result.sort(sortList);
        } else {
            result.sort("createdAt");
        }

        const limit = Number(req.query.limit) || 10;
        result.limit(limit);

        const recipes = await result;
        res.status(200).json({ recipesCount: recipes.length, recipes });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findOne({ _id: id });
        if (!recipe) {
            return res.status(404).json({ message: "No recipe with that id found" });
        }
        res.status(200).json({ recipe });
    } catch (error) {
        res.status(500).json(error);
    }
}

const createRecipe = async (req, res) => {
    try {
        res.json({ message: "Success" }); 
    } catch (error) {
        res.status(500).send(error);
    }
};
 
module.exports = { getAllRecipes, getRecipe, createRecipe };