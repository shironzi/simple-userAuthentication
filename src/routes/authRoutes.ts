import express from "express";
import { login, register, verifyToken } from '../contollers/authController'

const app = express.Router();

app.post('/register', register);
app.post('/login', login);

app.get('/protected', verifyToken);

export default app;