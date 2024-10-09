const express = require('express');
const router = express.Router();

const User = require('../models/todo.js');

// router.get("/", async (req, res) => {
//     res.render("index.ejs", {
//         user: req.session.user,
//     });
//   });

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const allTodos = currentUser.todos
    res.render("todos/index.ejs", { todos: allTodos, currentUser});

    } catch (error) {
      console.log(error)
      res.redirect('todos/index.ejs')
    }
  });

router.get("/todos", async (req, res) => {
    res.render("todos/index.ejs", { todos: allTodos});
  });

router.post("/users/<%= currentUser._id %>/todos", async (req, res) => {
    if (req.body.isFinished === "on") {
      req.body.isFinished = true;
    } else {
      req.body.isFinished = false;
    }
    await Todo.create(req.body);
    res.redirect("/users/<%= currentUser._id %>/todos"); 
  });
  
  

router.get("/todos", (req, res) => {
    res.render("todos/index.ejs");
})


router.get("/users/<%= currentUser._id %>/todos/new", (req, res) => {
    res.render("todos/new.ejs");
  });
router.post("/", async (req, res) => {
    console.log(req.body);
    res.redirect("/todos/new");
  });
router.post("/users/<%= currentUser._id %>/todos/new", async (req, res) => {
    if (req.body.isFinished === "on") {
      req.body.isFinished = true;
    } else {
      req.body.isFinished = false;
    }
    await User.create(req.body);
    res.redirect("/users/<%= currentUser._id %>/todos/new");
  });

router.get("/todos/:todoId", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.todoId)
    res.render("todos/show.ejs", { todo: foundTodo});
  });

router.delete("/todos/:todoId", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.todoId)
    res.redirect("/todos");
  });
  
router.get("/users/<%= currentUser._id %>/todos", async (req, res) => {
    const foundTodo = await Todo.findById(req.params.todoId);
    res.render("/todos/edit.ejs", {
        todo: foundTodo,
      });
    });

router.put("/todos/:todoId", async (req, res) => {
    if (req.body.isFinished === "on") {
          req.body.isFinished = true;
    } else {
          req.body.isFinished = false;
    }
    await Todo.findByIdAndUpdate(req.params.todoId, req.body);
        res.redirect(`/todos/${req.params.todoId}`);
      });


module.exports = router;


// /users/<%= currentUser._id %>/todos/new