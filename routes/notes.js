const express = require("express");
const router = express.Router();
const { getNotes, addNote, deleteNote } = require("../controllers/notes");

const { auth } = require("../middleware/auth");

//router.route("/").get(getNotes);

// every request POST, GET DELETE, ... after all() be
// affected by middleware auth for same path ("/")
router.route("/").all(auth).post(addNote).get(getNotes);
router.route("/:id").all(auth).delete(deleteNote);

module.exports = router;
