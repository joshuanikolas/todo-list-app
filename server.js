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

const port = process.env.PORT ? process.env.PORT : '3000';
const path = require('path');

const app = express();

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passUserToView);

///////main index route///////

app.get('/', (req, res) => {
    if (req.session.user) {
      res.redirect(`/users/${req.session.user._id}/todos`);
    } else {
      res.render('index.ejs');
    }
  });
  
app.use("/auth", authController);
app.use(isSignedIn);
app.use('/users/:userId/todos', todosController);

app.listen(3000, () => {
    console.log('Listening on Port 3000')
})