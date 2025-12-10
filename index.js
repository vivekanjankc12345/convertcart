// index.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { sequelize } from "./config/db.js";
import "./models/index.js";
import searchRoutes from "./routes/search.routes.js";

const app = express();
app.use(express.json());
app.use("/api", searchRoutes);

app.get("/", (req, res) => res.send("Backend running..."));

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => console.log("MySQL connected successfully"))
  .catch((err) => console.error("DB auth error:", err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
