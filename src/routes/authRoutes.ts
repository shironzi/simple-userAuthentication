import express from "express";
import { register } from '../contollers/authController'

const app = express.Router()

app.post('/register', register);

export default app;