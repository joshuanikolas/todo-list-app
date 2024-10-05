const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require("express");
const mongoose = require("mongoose"); // require package
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new


const app = express();


process.env.MONGODB_URI= 'mongodb+srv://joshuanikolass:Bebee0904.@joshuanikolass.8y5s8.mongodb.net/todo-list-app?retryWrites=true&w=majority&appName=joshuanikolass'
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


const Todo = require("./models/todo.js");

const createTodo = async() => {
    const todoData = {

    }
}
const { todo } = require("node:test");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new




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



app.post("/todos", async (req, res) => {
    if (req.body.isFinished === "on") {
      req.body.isFinished = true;
    } else {
      req.body.isFinished = false;
    }
    await Todo.create(req.body);
    res.redirect("/todos"); 
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

  app.get("/todos/:todoId", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.todoId)
    res.render("todos/show.ejs", { todo: foundTodo});
  });

  app.delete("/todos/:todoId", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.todoId)
    res.redirect("/todos");
  });
  
app.get("/todos/:todoId/edit", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.todoId);
    res.render("todos/edit.ejs", {
        todo: foundTodo,
      });
    });

    app.put("/todos/:todoId", async (req, res) => {
        // Handle the 'isReadyToEat' checkbox data
        if (req.body.isFinished === "on") {
          req.body.isFinished = true;
        } else {
          req.body.isFinished = false;
        }
        
        // Update the fruit in the database
        await Todo.findByIdAndUpdate(req.params.todoId, req.body);
      
        // Redirect to the fruit's show page to see the updates
        res.redirect(`/todos/${req.params.todoId}`);
      });

      app.listen(3000, () => {
        console.log("Listening on port 3000");
      });