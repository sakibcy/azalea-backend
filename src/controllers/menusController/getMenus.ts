import {Request, Response} from "express";
const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    try {
        const products = await Menu.find();

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}