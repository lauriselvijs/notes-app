const express = require("express");
const router = express.Router();
const { getNotes, addNote, deleteNote } = require("../controllers/notes");

const { auth } = require("../middleware/auth");

router.route("/").get(getNotes);

// every request POST, GET DELETE, ... after all() be
// affected by middleware auth
router.route("/").all(auth).post(addNote);
router.route("/:id").delete(deleteNote);

module.exports = router;
