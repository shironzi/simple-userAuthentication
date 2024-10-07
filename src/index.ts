import express from "express";
import env from "dotenv";

import sequelize from "./database/database";
import errorHandler from "../src/middleware/errorHandler";
import authRoutes from "../src/routes/authRoutes";

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("Port has been successfully established!");
    });
  } catch (error) {
    console.error("Unable to connect to Database: ", error);
    process.exit(1);
  }
};

startServer();

app.use('/auth',authRoutes);
// Global error handler
app.use(errorHandler);

export default app;
