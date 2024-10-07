import { Request, Response, NextFunction } from "express";

import User from "../model/User";
import Student from "../model/student";

export const createStudentRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(404).json({
        message: "You are not authenticated",
      });
    }

    console.log(user.role);

    // if (user.role != "admin") {
    //   res.status(403).json({
    //     message: "You are not allowed here",
    //   });
    // }
  } catch (error) {
    console.error(
      "Unexpected error occurred during creating student record:",
      error
    );
    next(error);
  }
};
