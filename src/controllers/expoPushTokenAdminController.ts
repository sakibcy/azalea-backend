import {Request, Response} from 'express';
import ExpoPushTokenAdmin from "../models/ExpoPushTokenAdmin";
import {generateResponse} from "../utils/generateResponse";

export default async (req: Request, res: Response) => {
    const {token} = req.body;
    try {
        // Validate if the token is provided
        if (!token) {
            return res.status(400).json(
                generateResponse(
                    true,
                    400,
                    'Error',
                    'Expo push token is required'
                )
            );
        }

        // Check if the Expo push token already exists in the database
        const existingExpoPushToken = await ExpoPushTokenAdmin.findOne({expoPushToken: token});
        if (existingExpoPushToken) {
            return res.status(409).json(
                generateResponse(
                    true,
                    409,
                    'Error',
                    'Expo push token already exists in the database'
                )
            );
        }

        // Create a new ExpoPushToken document and save it to the database
        const expoPushToken = new ExpoPushTokenAdmin({expoPushToken: token});
        await expoPushToken.save();

        return res
            .status(201)
            .json(
                generateResponse(
                    false,
                    201,
                    'Success',
                    'Expo push token saved successfully'
                )
            );
    } catch (error: any) {
        return res
            .status(500)
            .json(
                generateResponse(
                    true,
                    500,
                    'Error',
                    'An error occurred while saving the Expo push token'
                )
            );
    }
}