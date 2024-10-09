const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
// const { todo } = require('node:test');


  
//////index route//////
router.get('/', async (req, res) => {
    try {
      res.render('todos/index.ejs');
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  


/////new route/////
router.get('/new', (req, res) => {
    res.render('./new.ejs');
  });
  
router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.todos.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/todos`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});


router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.todos.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/todos`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('todos/index.ejs', {todos: currentUser.todos,});
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  

router.get('/:todoId', (req, res) => {
    res.send(`here is your request param: ${req.params.todoId}`);
  });
  

router.get('/:todoId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const todo = currentUser.todos.id(req.params.todoId);
      res.render('todos/show.ejs', {
        todo: todo,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });


router.delete('/:todoId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.todos.id(req.params.todoId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/todos`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  

router.get('/:todoId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const todo = currentUser.todos.id(req.params.todoId);
      res.render('todos/edit.ejs', {
        todo: todo,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  

router.put('/:todoId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const application = currentUser.todos.id(req.params.todoId);
      todo.set(req.body);
      await currentUser.save();
      res.redirect(
        `/users/${currentUser._id}/todos/${req.params.todoId}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
  
  
  module.exports = router;
// router.get("/", async (req, res) => {
//     res.render("index.ejs", {
//         user: req.session.user,
//     });
//   });

// router.get("/", async (req, res) => {
//     if (req.session.user) {
//         res.redirect(`/users/${req.session.user._id}/todos`)
//     } else {
//             res.render("index.ejs", {
//                 user: req.session.user,
//         });
//     }   
// });

// router.get("/todos/:todoId", async (req, res) => {
//     const foundTodo = await Todo.findById(req.params.todoId);
//     res.render("todos/show.ejs", { todo: foundTodo });
// });
  
// router.use("/auth", authController);
// router.use(isSignedIn);
// router.use('/users/:userId/todos', todosController)


// router.get("/todos", async (req, res) => {
//     const allTodos = await Todo.find({});
//     res.render("todos/index.ejs", { todos: allTodos});
//   });



// router.post("/todos", async (req, res) => {
//     if (req.body.isFinished === "on") {
//       req.body.isFinished = true;
//     } else {
//       req.body.isFinished = false;
//     }
//     await Todo.create(req.body);
//     res.redirect("/todos"); 
//   });
  
  

// router.get("/todos", (req, res) => {
//     res.render("todos/index.ejs");
// })


// router.get("/todos/new", (req, res) => {
//     res.render("todos/new.ejs");
//   });
// router.post("/", async (req, res) => {
//     try {
//         const user = await User.findById(req.session.user._id)
//         user.todos.push(req.body)
//         await user.save()
//         res.redirect(`/users/${user._id}/todos`)
//     }   catch(error){
//         console.log(error)
//         res.redirect("/")
//     }
//     });
// router.post("/todos", async (req, res) => {
//     if (req.body.isFinished === "on") {
//       req.body.isFinished = true;
//     } else {
//       req.body.isFinished = false;
//     }
//     await Todo.create(req.body);
//     res.redirect("/todos/new");
//   });

// router.get("/todos/:todoId", async (req, res) => {
//     const foundTodo = await Todo.findById(req.params.todoId)
//     res.render("todos/show.ejs", { todo: foundTodo});
//   });

// router.delete("/todos/:todoId", async (req, res) => {
//     await Todo.findByIdAndDelete(req.params.todoId)
//     res.redirect("/todos");
//   });
  
// router.get("/todos/:todoId/edit", async (req, res) => {
//     const foundTodo = await Todo.findById(req.params.todoId);
//     res.render("todos/edit.ejs", {
//         todo: foundTodo,
//       });
//     });

//     router.put("/todos/:todoId", async (req, res) => {
//         if (req.body.isFinished === "on") {
//           req.body.isFinished = true;
//         } else {
//           req.body.isFinished = false;
//         }
//         await Todo.findByIdAndUpdate(req.params.todoId, req.body);
//         res.redirect(`/todos/${req.params.todoId}`);
//       });




// /users/<%= currentUser._id %>/todos/new