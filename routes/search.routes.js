// routes/search.routes.js
import express from "express";
import { searchDish } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/search/dishes", searchDish);

export default router;
