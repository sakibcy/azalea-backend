import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";

const AddOn = require('../../models/AddOn');

export default async (req: Request, res: Response) => {
    try {
        const addon = await AddOn.findOne({_id: req.params.id});
        if (!addon) {
            return res
                .status(404)
                .json(generateResponse(true, 404, 'Error', 'Add on not found'));
        }
        return res.json(addon)
    } catch (err: any) {
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', err.message));
    }
}