"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = require("../controllers/users.controller");
var router = express_1.default.Router();
router.route("/").post(users_controller_1.registerNewUser);
exports.default = router;
