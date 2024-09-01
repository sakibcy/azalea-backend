import {Request, Response} from "express";
const AddOn = require('../../models/AddOn');

export default async (req: Request, res: Response) => {
    try {
        const addon = await AddOn.find();

        res.status(200).json({
            addon
        });
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}