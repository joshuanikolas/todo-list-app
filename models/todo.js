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
        // type: mongoose.Schema.Types.ObjectId
    },
});


const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;


