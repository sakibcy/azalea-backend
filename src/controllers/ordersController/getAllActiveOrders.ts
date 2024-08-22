import {Request, Response} from 'express';
import {generateResponse} from "../../utils/generateResponse";
import {ORDER_STATUS} from "../../constants";

const Order = require('../../models/Order');

const getAllActiveOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({status: ORDER_STATUS.Processing});
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', 'Internal Server Error'));
    }
};

export default getAllActiveOrders;