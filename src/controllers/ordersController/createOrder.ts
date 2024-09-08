import {Request, Response} from "express";
import {sendNewOrderNotificationToAdmin} from "../../utils/expoPushTokenAdmin";
import {generateResponse} from "../../utils/generateResponse";

const Order = require('../../models/Order');

export default async (req: Request, res: Response) => {
    try {
        const {
            uuid,
            user,
            items,
            subTotalPrice,
            taxAndFeesRateTotal,
            taxAndFeesPriceTotal,
            totalPrice
        } = req.body;

        if (
            !uuid || !user || !items ||
            !subTotalPrice || !taxAndFeesRateTotal || !taxAndFeesPriceTotal ||
            !totalPrice
        ) {
            return res.status(400).json({message: 'Missing required order details'});
        }

        // Create a new Order object
        const newOrder = new Order({
            uuid,
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
            .json({message: 'Order created successfully', order: savedOrder});

        await sendNewOrderNotificationToAdmin(newOrder._id, newOrder.user);

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json(
                generateResponse(
                    true,
                    500,
                    'Error',
                    'Internal Server error'
                )
            );
    }
}