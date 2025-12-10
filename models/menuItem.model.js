// models/menuItem.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const MenuItem = sequelize.define(
  "MenuItem",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
    dish_name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "menu_items", timestamps: false }
);
