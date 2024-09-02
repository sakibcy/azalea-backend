import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";

const AddOn = require('../../models/AddOn');

export default async (req: Request, res: Response) => {
    try {
        const addon = await AddOn.findOne({_id: req.params.id});
        if (!addon) {
            return res.status(404).json({message: 'No AddOn found'});
        }

        await AddOn.deleteOne({_id: req.params.id});
        res
            .status(200)
            .json(generateResponse(true, 200, 'Success', `AddOn deleted successfully`));
    } catch (err: any) {
        res
            .status(500)
            .json(generateResponse(true, 500, 'Error', `${err.message}`));
    }
}