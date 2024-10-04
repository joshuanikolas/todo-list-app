const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const todoSchema = new mongoose.Schema({
    status: Boolean,
    task: Boolean,
    notes: String,
    date: String,
    taskName: String,
});


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
