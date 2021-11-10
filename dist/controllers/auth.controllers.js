"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.authUser = void 0;
var User_1 = __importDefault(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { IGetUserAuthInfoRequest } from "./definitionfile";
// @desc Auth user
// @route POST /api/v1/auth
// @access Public
var authUser = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    // Validation
    if (!email || !password) {
        return res.status(400).json({
            msg: "Please enter all fields",
        });
    }
    // Check for existing user
    User_1.default.findOne({ email: email }).then(function (user) {
        if (!user) {
            return res.status(400).json({
                msg: "User does not exists",
            });
        }
        // Validate password
        bcryptjs_1.default.compare(password, user.password).then(function (isMatch) {
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials" });
            jsonwebtoken_1.default.sign({
                id: user.id,
            }, process.env.JWT_SECRET, { expiresIn: 3600 }, function (err, token) {
                if (err)
                    throw err;
                res.json({
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            });
        });
    });
};
exports.authUser = authUser;
// @desc Get user data
// @route GET /api/v1/auth/user
// @access Private
var getUserData = function (req, res) {
    User_1.default.findById(req.user.id)
        .select("-password")
        .then(function (user) { return res.json(user); });
};
exports.getUserData = getUserData;
