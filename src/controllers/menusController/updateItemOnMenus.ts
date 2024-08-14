import {Request, Response} from "express";
import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY} from "../../config";
import AWS from "aws-sdk";
import {s3Upload} from "../../utils/storage";
import {generateResponse} from "../../utils/generateResponse";
const Menu = require('../../models/Menu');

export const updateItemOnMenus = async (req: Request, res: Response) => {
    try {
        const {
            name,
            price,
            description,
            isAvailable
        } = req.body;

        const image = req.file;

        const item = await Menu.findOne({id: req.params.id});
        if (!item) {
            return res.status(404).json({message: 'Item not found'});
        }

        let newImageUrl = item.imageUrl;
        let newImageKey = item.imageKey;

        if (image) {
            // Upload new image to S3
            try {
                const {imageUrl, imageKey} = await s3Upload(image);
                newImageUrl = imageUrl;
                newImageKey = imageKey;

                // Delete previous image from S3 (if it exists)
                if (item.imageUrl && item.imageKey) {
                    try {
                        const s3 = new AWS.S3({
                            credentials: {
                                accessKeyId: AWS_ACCESS_KEY_ID,
                                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                            },
                            region: AWS_REGION
                        });
                        await s3.deleteObject({Bucket: AWS_S3_BUCKET_NAME, Key: item.imageKey}).promise();
                    } catch (e) {
                        return res.status(400).json({
                            error: `There was and error updating image.`
                        })
                    }
                }
            } catch (e) {
                return res.status(400).json({
                    error: `Couldn't upload new image`
                })
            }
        }

        item.name = name || item.name;
        item.price = price || item.price;
        item.description = description || item.description;
        item.isAvailable = isAvailable !== undefined ? isAvailable : item.isAvailable;
        item.imageUrl = newImageUrl;
        item.imageKey = newImageKey;


        try {
            const updatedItem = await item.save();
            return res.json(updatedItem);
        } catch (e) {
            return res.status(400).json({
                error: `There was and error updating image.`
            })
        }
    } catch (err: any) {
        return  res
                    .status(400)
                    .json(generateResponse(true, 400, 'Error', err.message));
    }
}