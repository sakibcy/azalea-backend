import {Request, Response} from 'express'
import {generateResponse} from "../../utils/generateResponse";
const Order = require("../../models/Order");

export default async (req: Request, res: Response) => {
    const {totalPrice, status} = req.body;
    const {id} = req.params;

    if (!id) {
        return res
               .status(400)
               .json(generateResponse(true, 400, 'Error', "Missing required fields"));
    }

    try {
        const order = await Order.findOne({_id: req.params.id});

        if (!order) {
            return res
                    .status(404)
                    .json(generateResponse(true, 404, 'Error', "Order not found"));
        }

        order.totalPrice = totalPrice;
        order.status = status;

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
};
