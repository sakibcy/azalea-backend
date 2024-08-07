const AWS = require('aws-sdk');
import {AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY} from "../config";

export const s3Upload = async (image: any) => {
    try {
        let imageUrl = '';
        let imageKey = '';

        if (!AWS_ACCESS_KEY_ID) {
            console.warn('Missing aws keys');
        }

        if (image) {
            const s3bucket = new AWS.S3({
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY_ID,
                    secretAccessKey: AWS_SECRET_ACCESS_KEY,
                },
                region: AWS_REGION
            });

            const params = {
                Bucket: AWS_S3_BUCKET_NAME,
                Key: image.originalname,
                Body: image.buffer,
                ContentType: image.mimetype
            };

            const s3Upload = await s3bucket.upload(params).promise();

            imageUrl = s3Upload.Location;
            imageKey = s3Upload.key;
        }

        return {imageUrl, imageKey};
    } catch (error) {
        return {imageUrl: '', imageKey: ''};
    }
};