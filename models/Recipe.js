const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, input recipe's name"],
        trim: true,
        maxlength: [100, "Recipe's name is too long. It can't exceed 100 characters"],
        minlength: [3, "Too short, 3 characters minimum"]
    }, 
    image: {
        type: String
    },
    text: {
        type: String,
        required: [true, "Please, describe your recipe"],
    },
    ingredients: {
        type: Array
    },
    mealtime: {
        type: String,
        enum: {
            values: ["breakfast", "lunch", "dinner", "snack", "other"],
            message: "{VALUE} is not on the list"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    commentCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    prepTime: {
        type: Number,
        default: 0
    },
    cookTime: {
        type: Number,
        default: 0
    },
    instructions: {
        type: Array
    },
    nutrition: {
        type: Object
    }
});

module.exports = mongoose.model("Recipe", RecipeSchema);