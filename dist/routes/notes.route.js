"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var notes_controller_1 = require("../controllers/notes.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
// every request POST, GET DELETE, ... after all() be
// affected by middleware auth for same path ("/")
router.route("/").all(auth_middleware_1.auth).post(notes_controller_1.addNote).get(notes_controller_1.getNotes);
router.route("/:id").all(auth_middleware_1.auth).delete(notes_controller_1.deleteNote);
exports.default = router;
