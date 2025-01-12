const express = require("express");
require("dotenv").config();

const recipes = require("./routes/recipes")
const connectDB = require("./db/connect");

const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/recipes", recipes);


const PORT = 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Alive here localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();