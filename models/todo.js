const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const todoSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
    },
    task: {
        type: Boolean,
    },
    notes: {
        type: String,
    },
    date: {
        type: String,
    },
    taskName: {
        type: String,
        required: true,
    }
});


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
