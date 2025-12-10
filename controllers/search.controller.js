// controllers/search.controller.js
import { Restaurant, MenuItem, Order } from "../models/index.js";
import { Sequelize } from "sequelize";

export const searchDish = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    // build filters only when provided
    const where = {};
    if (name) {
      where.dish_name = { [Sequelize.Op.like]: `%${name}%` };
    }
    if (minPrice || maxPrice) {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
      where.price = { [Sequelize.Op.between]: [min, max] };
    }

    // find menu items matching dish name + price range, count orders per menu item
    const items = await MenuItem.findAll({
      where,
      include: [
        {
          model: Restaurant,
          attributes: ["id", "name", "city"]
        },
        {
          model: Order,
          attributes: [],
          required: false // allow menu items with zero orders
        }
      ],
      attributes: [
        "id",
        "dish_name",
        "price",
        "restaurant_id",
        [Sequelize.fn("COUNT", Sequelize.col("Orders.id")), "orderCount"]
      ],
      group: ["MenuItem.id", "Restaurant.id"],
      subQuery: false, // force a single query so the Orders join is present for the COUNT
      order: [[Sequelize.literal("orderCount"), "DESC"]],
      limit: 10,
      raw: true,
      nest: true
    });

    const restaurants = items.map((it) => ({
      restaurantId: it.Restaurant.id,
      restaurantName: it.Restaurant.name,
      city: it.Restaurant.city,
      dishName: it.dish_name,
      dishPrice: it.price,
      orderCount: Number(it.orderCount)
    }));

    return res.status(200).json({
      status: 1,
      message: "Restaurant list fetched successfully",
      restaurants
    });
  } catch (err) {
    console.error("searchDish error:", err);
    return res.status(500).json({ status: 0, message: "Internal Server Error" });
  }
};
