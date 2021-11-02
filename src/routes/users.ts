const express = require("express");
const router = express.Router();
const { registerNewUser } = require("../controllers/users");

router.route("/").post(registerNewUser);

module.exports = router;
