const express = require("express");
const router = express.Router();
const { getNotes, addNote, deleteNote } = require("../controllers/notes");

router.route("/").get(getNotes).post(addNote);

router.route("/:id").delete(deleteNote);

module.exports = router;
