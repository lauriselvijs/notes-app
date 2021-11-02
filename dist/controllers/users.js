const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// @desc Register new user
// @route POST /api/v1/users
// @access Public
exports.registerNewUser = (req, res, next) => {
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "Please enter all fields",
        });
    }
    // Check for existing user
    User.findOne({ email }).then((user) => {
        if (user) {
            return res.status(400).json({
                msg: "User already exists",
            });
        }
        const newUser = new User({
            name,
            email,
            password,
        });
        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err)
                    throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
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
        });
    });
};
//# sourceMappingURL=users.js.map