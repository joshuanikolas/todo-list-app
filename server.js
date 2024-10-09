const dotenv = require("dotenv");
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose"); 
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); 
const authController = require("./controllers/auth.js");
const todosController = require('./controllers/todos.js');
const session = require('express-session');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const app = express();


process.env.MONGODB_URI= 'mongodb+srv://joshuanikolass:Bebee0904.@joshuanikolass.8y5s8.mongodb.net/todo-list-app?retryWrites=true&w=majority&appName=joshuanikolass'
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


app.use(express.urlencoded({ extended: false }));

const Todo = require("./models/todo.js");
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );


const createTodo = async() => {
    const todoData = {

    }
}
const { todo } = require("node:test");
app.use(passUserToView);



app.get("/", async (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/todos`)
    } else {
            res.render("index.ejs", {
                user: req.session.user,
        });
    }   
});
  
app.use("/auth", authController);
app.use(isSignedIn);
app.use('/users/:userId/todos', todosController)


app.get("/todos", async (req, res) => {
    const allTodos = await Todo.find({});
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
        if (req.body.isFinished === "on") {
          req.body.isFinished = true;
        } else {
          req.body.isFinished = false;
        }
        await Todo.findByIdAndUpdate(req.params.todoId, req.body);
        res.redirect(`/todos/${req.params.todoId}`);
      });

//       let port;
// if (process.env.PORT) {
//   port = process.env.PORT;
// } else {
//   port = 3000;
// }

// app.listen(port, () => {
//     console.log(`The express app is ready on port ${port}!`);
//   });

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})