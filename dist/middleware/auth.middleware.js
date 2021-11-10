"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jwt = require("jsonwebtoken");
// @desc Auth user
// @route POST /api/v1/auth
// @access Public
var auth = function (req, res, next) {
    var token = req.header("x-auth-token");
    // Check for token
    if (!token)
        return res.status(401).json({ msg: "No token, authorization denied" });
    try {
        // Verify token
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Add user from payload
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({
            msg: "Token is not valid",
        });
    }
};
exports.auth = auth;
