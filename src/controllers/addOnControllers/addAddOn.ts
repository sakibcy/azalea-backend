import {Request, Response} from "express";
import {s3Upload} from "../../utils/storage";
import {generateResponse} from "../../utils/generateResponse";

const AddOn = require('../../models/AddOn');

export default async (req: Request, res: Response) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.file;

    if (!name) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'You must provide a Add On name'));
    }

    if (!price) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'You must provide a Price'));
    }

    if (!image) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'You must provide a Image'));
    }

    try {
        const {imageUrl, imageKey} = await s3Upload(image);

        const addOn = new AddOn({
            name,
            price,
            imageUrl,
            imageKey
        });

        try {
            const savedAddOn = await addOn.save();

            return res
                .status(200)
                .json({
                    ...generateResponse(false, 200, 'Success', 'Add On Added Successfully!'),
                    addon: savedAddOn
                });
        } catch (error) {
            return res
                .status(400)
                .json(generateResponse(true, 400, 'Error', 'Saving into Database Failed'))
        }
    } catch (error) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'Your request could not be processed. Please try again.'));
    }
}