// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");

const app = express();

// GET /
// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

app.get("/", async (req, res) => {
    res.render("index.ejs");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
