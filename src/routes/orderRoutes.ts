import express from "express";
import {requireAuth} from "../middleware/auth";
import createOrder from "../controllers/ordersController/createOrder";
import deleteOrder from "../controllers/ordersController/deleteOrder";
import getAllOrders from "../controllers/ordersController/getAllOrders";
import getOrderById from "../controllers/ordersController/getOrderById";
import updateOrder from "../controllers/ordersController/updateOrder";

const router = express.Router();

router.post('/order', createOrder);
router.delete('/order/:id', requireAuth, deleteOrder);
router.get('/orders', requireAuth, getAllOrders);
router.get('/order/:id', getOrderById);
router.put('/order/:id', requireAuth, updateOrder);

export default router;