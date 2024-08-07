import {Request, Response} from "express";
import {s3Upload} from "../../utils/storage";

const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const isActive = req.body.isActive;
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

        const {imageUrl, imageKey} = await s3Upload(image);

        console.log(`Add Menu ***************** ${imageUrl} ${imageKey}`)

        const product = new Menu({
            name,
            description,
            price,
            isActive,
            imageUrl,
            imageKey
        });

        const savedProduct = await product.save();

        if (savedProduct) {
            res.status(200).json({
                success: true,
                message: `Product has been added successfully!`,
                product: savedProduct
            });
        } else {
            res.status(500).json({
                error: 'An error occurred while saving the product.'
            });
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