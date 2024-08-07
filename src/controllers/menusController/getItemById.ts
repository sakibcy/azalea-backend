import {Request, Response} from "express";
const Menus = require('../../models/Menus');

export default async (req: Request, res: Response) => {
    try {
        const item = await Menus.findOne({id: req.params.id});
        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }
        return res.json(item)
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}