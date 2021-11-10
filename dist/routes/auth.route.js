"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = express_1.default.Router();
router.route("/").post(auth_controller_1.authUser);
router.route("/user").all(auth_middleware_1.auth).get(auth_controller_1.getUserData);
exports.default = router;
