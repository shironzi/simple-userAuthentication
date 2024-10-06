import User from "../model/User";

export interface UserResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
}
