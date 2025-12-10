// seed/seed.js
import { sequelize } from "../config/db.js";
import { Restaurant, MenuItem, Order } from "../models/index.js";

(async () => {
  try {
    // force:true drops tables if they exist — this ensures schema is correct
    await sequelize.sync({ force: true });

    const r1 = await Restaurant.create({ name: "Hyderabadi Spice House", city: "Hyderabad" });
    const r2 = await Restaurant.create({ name: "Biryani Palace", city: "Bangalore" });

    const m1 = await MenuItem.create({ restaurant_id: r1.id, dish_name: "Chicken Biryani", price: 220 });
    const m2 = await MenuItem.create({ restaurant_id: r1.id, dish_name: "Paneer Biryani", price: 180 });
    const m3 = await MenuItem.create({ restaurant_id: r2.id, dish_name: "Chicken Biryani", price: 250 });

    // create orders (one order = one item)
    await Order.bulkCreate([
      { restaurant_id: r1.id, menu_item_id: m1.id },
      { restaurant_id: r1.id, menu_item_id: m1.id },
      { restaurant_id: r1.id, menu_item_id: m1.id },
      { restaurant_id: r2.id, menu_item_id: m3.id },
      { restaurant_id: r2.id, menu_item_id: m3.id }
    ]);

    console.log("Seed completed");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
})();
