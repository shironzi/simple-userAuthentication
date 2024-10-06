import { Request, Response, NextFunction } from "express";
import { hashSync } from "bcrypt";
import { ValidationError, body, validationResult } from "express-validator";

import User from "../model/User";
import { ErrorResponse, UserResponse } from "interfaces/UserResponse";

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const register = async (
  req: Request,
  res: Response<UserResponse | ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Error",
      });
    }

    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res.status(404).json({
        message: "username, email, password, confirmpassword is required",
      });
      return;
    }

    const isUsernameTaken = await User.findOne({
      where: {
        username,
      },
    });

    if (isUsernameTaken) {
      res.status(409).json({
        message: "Username was already registered",
      });
      return;
    }

    const isEmailTaken = await User.findOne({
      where: {
        email,
      },
    });

    if (isEmailTaken) {
      res.status(409).json({
        message: "Email was already taken!",
      });
      return;
    }

    if (password != confirmPassword) {
      res.status(409).json({
        message: "Password does not match!",
      });
      return;
    }

    const saltRounds = 10;

    const hashedPassword = hashSync(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User successfully created!",
      user: user,
    });
  } catch (error) {
    console.error("Unexpected occurred during register", error);
    return next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        let secret = "my-secret"
        let data = {
            time: Date()
        }
    }catch (error){
        console.error("Unexpected happen during Login: ", error)
        next(error)
    }
};
