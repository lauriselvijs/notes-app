"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// @desc Auth user
// @route POST /api/v1/auth
// @access Public
exports.authUser = (req, res, next) => {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
        return res.status(400).json({
            msg: "Please enter all fields",
        });
    }
    // Check for existing user
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(400).json({
                msg: "User does not exists",
            });
        }
        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid credentials" });
            jwt.sign({
                id: user.id,
            }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err)
                    throw err;
                res.json({
                    token,
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
// @desc Get user data
// @route GET /api/v1/auth/user
// @access Private
exports.getUserData = (req, res, next) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => res.json(user));
};
//# sourceMappingURL=auth.js.map