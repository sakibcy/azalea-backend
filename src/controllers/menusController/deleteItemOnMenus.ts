import {Request, Response} from "express";
const Menus = require('../../models/Menus');

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const item = await Menus.findOne({id});
        if (!item) {
            return res.status(404).json({message: 'No item found'});
        }

        await Menus.deleteOne({id});
        res.status(200).json({message: 'Item deleted successfully'});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}