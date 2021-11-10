import express from "express";
import { registerNewUser } from "../controllers/users.controller";

const router = express.Router();

router.route("/").post(registerNewUser);

export default router;
