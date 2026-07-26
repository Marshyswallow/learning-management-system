import express from "express";
import isAuth from "../middleware/isAuth.js";
import { RazorpayOrder, verifyPayment } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", isAuth, RazorpayOrder);
orderRouter.post("/verify", isAuth, verifyPayment);

export default orderRouter;
