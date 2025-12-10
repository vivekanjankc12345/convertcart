// models/order.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Order = sequelize.define(
  "Order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    restaurant_id: { type: DataTypes.INTEGER, allowNull: false },
    menu_item_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "orders", timestamps: false }
);
