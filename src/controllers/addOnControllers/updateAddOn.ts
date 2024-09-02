import {Request, Response} from "express";
import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY} from "../../config";
import AWS from "aws-sdk";
import {s3Upload} from "../../utils/storage";
import {generateResponse} from "../../utils/generateResponse";
const AddOn = require('../../models/AddOn');

export default async (req: Request, res: Response) => {
    try {
        const {
            name,
            price,
            isAvailable
        } = req.body;

        const image = req.file;

        const addon = await AddOn.findOne({_id: req.params.id});
        if (!addon) {
            return res.status(404).json({message: 'Add on not found'});
        }

        let newImageUrl = addon.imageUrl;
        let newImageKey = addon.imageKey;

        if (image) {
            // Upload new image to S3
            try {
                const {imageUrl, imageKey} = await s3Upload(image);
                newImageUrl = imageUrl;
                newImageKey = imageKey;

                // Delete previous image from S3 (if it exists)
                if (addon.imageUrl && addon.imageKey) {
                    try {
                        const s3 = new AWS.S3({
                            credentials: {
                                accessKeyId: AWS_ACCESS_KEY_ID,
                                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                            },
                            region: AWS_REGION
                        });
                        await s3.deleteObject({Bucket: AWS_S3_BUCKET_NAME, Key: addon.imageKey}).promise();
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

        addon.name = name || addon.name;
        addon.price = price || addon.price;
        addon.isAvailable = isAvailable !== undefined ? isAvailable : addon.isAvailable;
        addon.imageUrl = newImageUrl;
        addon.imageKey = newImageKey;


        try {
            const updatedAddOn = await addon.save();
            return res.json(updatedAddOn);
        } catch (error: any) {
            return res
                .status(400)
                .json(
                    generateResponse(true, 400, 'Error', `There was and error updating add on. ${error.message}`)
                );
        }
    } catch (error: any) {
        return  res
            .status(400)
            .json(generateResponse(true, 400, 'Error', error.message));
    }
}