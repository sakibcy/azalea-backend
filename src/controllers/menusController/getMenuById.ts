import {Request, Response} from "express";
const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        console.log(`Searching for item with ID: ${id}`);
        const item = await Menu.findOne({ id, isActive: true });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json(item)
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}