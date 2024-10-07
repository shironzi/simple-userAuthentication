import express from "express";
import { verifyToken } from "../contollers/authController";
import { createStudentRecord } from "../contollers/studentController";

const app = express.Router();

app.post("/create-student-record", verifyToken, createStudentRecord);

export default app;
