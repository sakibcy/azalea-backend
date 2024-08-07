import {Request, Response} from "express";
const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    const slug = req.params.slug;

    try {
        const item = await Menu.findOne({slug, isActive: true});
        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }
        return res.json(item)
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
}