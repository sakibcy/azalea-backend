import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";
const Order = require('../../models/Order')

export default async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const order = await Order.find({_id: id});

        res.status(200).json(order);
    } catch (err: any) {
        res.status(500).json(
            generateResponse(true, 500, 'Error', err.message)
        );
    }
}