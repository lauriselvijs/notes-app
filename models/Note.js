const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Note", NoteSchema);
