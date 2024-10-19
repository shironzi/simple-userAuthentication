import express from "express";
import { verifyToken } from "../contollers/authController";
import {
  createStudentRecord,
  deleteStudentRecord,
  getStudentRecords,
  updateStudentRecord,
} from "../contollers/studentController";

const app = express.Router();

app.post("/create-student-record", verifyToken, createStudentRecord);
app.get("/get-all-records", verifyToken, getStudentRecords);
app.put("/update-student-record/:id", verifyToken, updateStudentRecord);
app.delete("/delete/:id", verifyToken, deleteStudentRecord);

export default app;
