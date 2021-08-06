const express = require("express");
const router = express.Router();
const { authUser, getUserData } = require("../controllers/auth");

const { auth } = require("../middleware/auth");

router.route("/").post(authUser);
router.route("/user").all(auth).get(getUserData);

module.exports = router;
