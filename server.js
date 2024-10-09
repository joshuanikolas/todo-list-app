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


const Todo = require("./models/user.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passUserToView);


const createTodo = async() => {
    const todoData = {

    }
}
const { todo } = require("node:test");



app.get("/", async (req, res) => {
        res.render("index.ejs", {
            user: req.session.user,
        });
});
  

////index page////
app.get('/', (req, res) => {
    if (req.session.user) {
      res.redirect(`/users/${req.session.user._id}/todos`);
    } else {
      res.render('index.ejs');
    }
  });
  
  app.get("/todos/:todoId", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.todoId);
    res.render("todos/show.ejs", { todo: foundTodo });
});

app.use("/auth", authController);
app.use(isSignedIn);
app.use('/users/:userId/todos', todosController);

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})