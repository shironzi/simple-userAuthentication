import { Model, ModelAttributes, DataTypes } from "sequelize";

import sequelize from "../database/database";

interface StudentAttributes {
  studentId: number;
  name: string;
  math: string;
  science: string;
}

class Student extends Model<ModelAttributes, StudentAttributes> {}

Student.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    math: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    science: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Students",
    sequelize,
    timestamps: true,
  }
);

export default Student;
