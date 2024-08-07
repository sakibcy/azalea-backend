import {Request, Response} from "express";
const Menus = require('../../models/Menus');

export const updateItemOnMenus = async (req: Request, res: Response) => {
    try {
        const {
            image,
            name,
            price,
            category,
            description
        } = req.body;

        const item = await Menus.findOne({id: req.params.id});
        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }

        item.image = image || item.image;
        item.name = name || item.name;
        item.price = price || item.price;
        item.category = category || item.category;
        item.description = description || item.description;


        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err: any) {
        res.status(400).json({message: err.message});
    }
}