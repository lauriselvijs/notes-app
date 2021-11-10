import jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

// @desc Auth user
// @route POST /api/v1/auth
// @access Public
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      msg: "Token is not valid",
    });
  }
};
