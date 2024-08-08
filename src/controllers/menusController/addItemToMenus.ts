import {Request, Response} from "express";
import {s3Upload} from "../../utils/storage";

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
                .json({error: 'You must enter description & name.'});
        }

        if (!price) {
            return res.status(400).json({error: 'You must enter a price.'});
        }

        if (!image) {
            return res.status(400).json({error: 'You must upload a image.'});
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

            res.status(200).json({
                success: true,
                message: `Menu has been added successfully!`,
                product: savedProduct
            });
        } catch (error) {
            return res.status(400).json({
                error: 'Saving into Database failed'
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}


//
// export default async function addItemToMenus(req: Request, res: Response) {
//     const {image, name, price, category, description} = req.body;
//
//     const item = new Menu({
//         image,
//         name,
//         price,
//         category,
//         description
//     });
//
//     try {
//         const newItem = await item.save();
//         res.status(201).json(newItem);
//     } catch (err: any) {
//         res.status(400).json({message: err.message});
//     }
// }