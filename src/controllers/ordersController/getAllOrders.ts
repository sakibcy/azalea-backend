import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";
const Order = require('../../models/Order')

export default async (req: Request, res: Response) => {
    const {uuid} = req.params;

    try {
        const orders = await Order.find();
        console.log(orders)
        res.status(200).json(orders);
    } catch (err: any) {
        res.status(500).json(
            generateResponse(true, 500, 'Error', err.message)
        );
    }
}