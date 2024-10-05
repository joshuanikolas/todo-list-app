const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const todoSchema = new mongoose.Schema({
    notes: {
        type: String,
    },
    date: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
     isFinished: {
        type: Boolean
    },
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

