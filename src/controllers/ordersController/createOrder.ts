import {Request, Response} from "express";
const Order = require('../../models/Order');

export default async (req: Request, res: Response) => {
    try {
        const { user, items, subTotalPrice, taxAndFeesRateTotal, taxAndFeesPriceTotal, totalPrice } = req.body;

        if (!user || !items || !subTotalPrice || !taxAndFeesRateTotal || !taxAndFeesPriceTotal || !totalPrice) {
          return res.status(400).json({ message: 'Missing required order details' });
        }

        // Create a new Order object
        const newOrder = new Order({
            user,
            items,
            subTotalPrice,
            taxAndFeesRateTotal,
            taxAndFeesPriceTotal,
            totalPrice,
        });

        const savedOrder = await newOrder.save();

        res
            .status(201)
            .json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: 'Internal server error'});
    }
}