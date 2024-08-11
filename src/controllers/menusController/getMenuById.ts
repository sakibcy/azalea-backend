import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";

const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        console.log(`Searching for item with ID: ${id}`);
        const item = await Menu.findOne({id, isActive: true});
        if (!item) {
            return res
                .status(404)
                .json(generateResponse(true, 404, 'Error', 'Item not found'));
        }
        return res.json(item)
    } catch (err: any) {
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', err.message));
    }
}