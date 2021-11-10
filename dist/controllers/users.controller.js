"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = void 0;
var User_models_1 = __importDefault(require("../models/User.models"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// @desc Register new user
// @route POST /api/v1/users
// @access Public
var registerNewUser = function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "Please enter all fields",
        });
    }
    // Check for existing user
    User_models_1.default.findOne({ email: email }).then(function (user) {
        if (user) {
            return res.status(400).json({
                msg: "User already exists",
            });
        }
        var newUser = new User_models_1.default({
            name: name,
            email: email,
            password: password,
        });
        // Create salt and hash
        bcryptjs_1.default.genSalt(10, function (err, salt) {
            bcryptjs_1.default.hash(newUser.password, salt, function (err, hash) {
                if (err)
                    throw err;
                newUser.password = hash;
                newUser.save().then(function (user) {
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
        });
    });
};
exports.registerNewUser = registerNewUser;
