const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Note", NoteSchema);
