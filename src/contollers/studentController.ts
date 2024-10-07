import { Request, Response, NextFunction } from "express";

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
      return;
    }

    if (user.role != "admin") {
      res.status(403).json({
        message: "access is forbidden",
      });
      return;
    }

    const { name, math, science } = req.body;

    const student = await Student.create({
      name,
      math,
      science,
    });

    await student.save();

    res.status(201).json({
      message: "Student has been successfully created!",
      student: student,
    });
  } catch (error) {
    console.error(
      "Unexpected error occurred during creating student record:",
      error
    );
    next(error);
  }
};

export const getStudentRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(403).json({
        message: "You are not authenticated",
      });
      return;
    }

    if (user.role != "admin" && user.role != "regular") {
      res.status(403).json({
        message: "access forbidden",
      });
      return;
    }

    const allStudent = await Student.findAll();

    res.status(200).json({
      message: "Successfully fetching all students",
      student: allStudent,
    });
  } catch (error) {
    console.error("Unexpected happen during getting student records", error);
    next(error);
  }
};

export const updateStudentRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      res.status(403).json({
        message: "You are not authenticated",
      });
      return;
    }

    if (user.role != "admin") {
      res.status(403).json({
        message: "You don't have access to edit student record",
      });
      return;
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({
        message: `student with id({id}) does not exist`,
      });
      return;
    }

    const { name, math, science } = req.body;

    if (!name || !math || !science) {
      res.status(404).json({
        message: "name | math | science is required",
      });
      return;
    }

    student.name = name;
    student.math = math;
    student.science = science;

    await student.save();

    res.status(200).json({
      message: "Successfully updated a student record",
      student: student,
    });
  } catch (error) {
    console.error("Unexpected happen during updating student record", error);
    next(error);
  }
};

export const deleteStudentRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    console.error("Unexpected happen during delete student record: ", error);
  }
};
