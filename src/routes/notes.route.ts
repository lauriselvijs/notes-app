import express from "express";
import { getNotes, addNote, deleteNote } from "../controllers/notes.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// every request POST, GET DELETE, ... after all() be
// affected by middleware auth for same path ("/")
router.route("/").all(auth).post(addNote).get(getNotes);
router.route("/:id").all(auth).delete(deleteNote);

export default router;
