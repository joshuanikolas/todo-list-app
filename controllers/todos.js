const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



// controllers/applications.js

  
/////////new route/////////

router.get('/new', async (req, res) => {
    res.render('todos/new.ejs');
  });
  /////// create route/////
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

////////index route/////////
router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('todos/index.ejs', {
        todos: currentUser.todos,
        currentUser
      });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  
////////// show route/////////
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

///////// delete route///////////
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
  
////////// edit route/////////
router.get('/:todoId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const todo = currentUser.todos.id(req.params.todoId);
      res.render('todos/edit.ejs', {
        todo: todo,
      });
    } catch (error) {
      console.log(error);
      res.redirect(`/users/${req.session.user._id}/todos`)
    }
  });
  
 ////////// update route/////////
router.put('/:todoId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const todo = currentUser.todos.id(req.params.todoId);
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