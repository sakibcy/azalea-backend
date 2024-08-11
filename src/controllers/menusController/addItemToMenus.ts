import {Request, Response} from "express";
import {s3Upload} from "../../utils/storage";
import {generateResponse} from "../../utils/generateResponse";

const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const isAvailable = req.body.isAvailable;
    const image = req.file;

    if (!description || !name) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'You must provide a Description'));
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

        const product = new Menu({
            name,
            description,
            price,
            isAvailable,
            imageUrl,
            imageKey
        });

        try {
            const savedProduct = await product.save();

            return res
                .status(200)
                .json({
                    ...generateResponse(false, 200, 'Success', 'Menu Added Successfully!'),
                    product: savedProduct
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