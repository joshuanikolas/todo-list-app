// Here is where we import modules
// We begin by loading Express
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package

const app = express();


process.env.MONGODB_URI= 'mongodb+srv://joshuanikolass:Bebee0904.@joshuanikolass.8y5s8.mongodb.net/todo-list-app?retryWrites=true&w=majority&appName=joshuanikolass'
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


  const Todo = require("./models/todo.js");

  app.use(express.urlencoded({ extended: false }));



// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/todos", async (req, res) => {
    const allTodos = await Todo.find();
    res.render("todos/index.ejs", { todos: allTodos});
  });

// server.js

// POST /fruits
app.post("/todos", async (req, res) => {
    if (req.body.isFinished === "on") {
      req.body.isFinished = true;
    } else {
      req.body.isFinished = false;
    }
    await Todo.create(req.body);
    res.redirect("/todos"); // redirect to index fruits
  });
  
  

app.get("/todos", (req, res) => {
    res.render("todos/index.ejs");
})


app.get("/todos/new", (req, res) => {
    res.render("todos/new.ejs");
  });
  app.post("/todos", async (req, res) => {
    console.log(req.body);
    res.redirect("/todos/new");
  });
  app.post("/todos", async (req, res) => {
    if (req.body.isFinished === "on") {
      req.body.isFinished = true;
    } else {
      req.body.isFinished = false;
    }
    await Todo.create(req.body);
    res.redirect("/todos/new");
  });
  


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
