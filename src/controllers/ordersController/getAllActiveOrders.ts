import {Request, Response} from 'express';
import {generateResponse} from "../../utils/generateResponse";

const Order = require('../../models/Order');

const getAllActiveOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({status: 'Processing'});
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', 'Internal Server Error'));
    }
};

export default getAllActiveOrders;