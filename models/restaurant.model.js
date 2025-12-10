// models/restaurant.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "restaurants", timestamps: false }
);
