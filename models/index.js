// models/index.js
import { Restaurant } from "./restaurant.model.js";
import { MenuItem } from "./menuItem.model.js";
import { Order } from "./order.model.js";

// associations
Restaurant.hasMany(MenuItem, { foreignKey: "restaurant_id" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

Restaurant.hasMany(Order, { foreignKey: "restaurant_id" });
Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" });

MenuItem.hasMany(Order, { foreignKey: "menu_item_id" });
Order.belongsTo(MenuItem, { foreignKey: "menu_item_id" });

export { Restaurant, MenuItem, Order };
