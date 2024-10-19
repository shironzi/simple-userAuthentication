import User from "../model/User";
import { ValidationError } from "express-validator";

export interface UserResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
  errors?: ValidationError[];
}

export interface AccessDeniedResponse {
  message: "access is forbidden";
}
