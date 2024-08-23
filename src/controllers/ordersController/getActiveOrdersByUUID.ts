import {Request, Response} from 'express';
import {CART_ITEM_STATUS} from "../../constants";
import {generateResponse} from "../../utils/generateResponse";

const Order = require('../../models/Order');

export default async function (req: Request, res: Response) {
    try {
        const {uuid} = req.params;
        const activeOrders = await Order.find({uuid, status: CART_ITEM_STATUS.Processing}).exec();

        res.status(200).json(activeOrders);
    } catch (error) {
        console.error("Error fetching active orders:", error);
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', 'Internal server error'));
    }
}