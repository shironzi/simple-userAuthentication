import { Dialect, Sequelize } from "sequelize";
import env from "dotenv";

env.config();

const { DB_NAME, DB_USER, DB_PW, DB_DIALECT, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
  dialect: DB_DIALECT as Dialect,
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testConnection = async () => {
    try{
        sequelize.authenticate()
        console.log("Connection has been stablished successfully");
    }catch(error){
        console.error("Unable to connect to database: ", error);
        process.exit(1)
    }
}

export default sequelize;