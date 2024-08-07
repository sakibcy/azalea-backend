import {Request, Response} from "express";
const Menus = require('../../models/Menus');

export default async function addItemToMenus(req: Request, res: Response) {
    const {image, name, price, category, description} = req.body;

    const item = new Menus({
        image,
        name,
        price,
        category,
        description
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
}