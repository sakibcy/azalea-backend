import {Request, Response} from "express";
const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const item = await Menu.findOne({id});
        if (!item) {
            return res.status(404).json({message: 'No Menu found'});
        }

        await Menu.deleteOne({id});
        res.status(200).json({message: 'Menu deleted successfully'});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}