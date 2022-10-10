import User from "../models/User.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// @desc Auth user
// @route POST /api/v1/auth
// @access Public
export const authUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields",
    });
  }

  // Check for existing user
  User.findOne({ email }).then((user: any) => {
    if (!user) {
      return res.status(400).json({
        msg: "User does not exists",
      });
    }

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

// @desc Get user data
// @route GET /api/v1/auth/user
// @access Private
export const getUserData = (req: Request, res: Response) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user: any) => res.json(user));
};
