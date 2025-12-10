import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
   dialectOptions: {
      ssl: {
        ca: fs.readFileSync("./certs/ca.pem"), // <-- FIXED
      },
    },

    logging: false,
  }
);
