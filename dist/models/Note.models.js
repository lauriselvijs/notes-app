"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var NoteSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    subject: {
        type: String,
        trim: true,
        required: [true, "Please enter subject"],
    },
    author: {
        type: String,
        trim: true,
        required: [true, "Please enter author"],
    },
    text: {
        type: String,
        trim: true,
        required: [true, "Please enter some text"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose.model("Note", NoteSchema);
