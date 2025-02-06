import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", orderController.newOrder);
router.get("/revenue", orderController.totalRevenue);

export const orderRouter = router;
