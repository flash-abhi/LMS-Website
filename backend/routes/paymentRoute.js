import express from "express"
import { RazorpayOrder, verifyPayment } from "../Controller/orderController.js";

const paymentRouter  = express.Router();

paymentRouter.post(`/razorpay-order`,RazorpayOrder);
paymentRouter.post(`/verifypayment`,verifyPayment);

export default paymentRouter;