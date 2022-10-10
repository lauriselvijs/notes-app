import express from "express";
import { authUser, getUserData } from "../controllers/auth.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/").post(authUser);
router.route("/user").all(auth).get(getUserData);

export default router;
