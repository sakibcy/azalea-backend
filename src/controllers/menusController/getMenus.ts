import {Request, Response} from "express";
const Menus = require('../../models/Menus');

export default async (req: Request, res: Response) => {
    try {
        const items = await Menus.find();
        res.json(items);
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}