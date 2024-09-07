import {Request, Response} from 'express';
import ExpoPushTokenAdmin from "../models/ExpoPushTokenAdmin";
import {generateResponse} from "../utils/generateResponse";

export default async (req: Request, res: Response) => {
    try {
        const {token} = req.body;

        // Validate if the token is provided
        if (!token) {
            return res.status(400).json(
                generateResponse(true, 400, 'Error', 'Expo push token is required')
            );
        }

        // Create a new ExpoPushToken document and save it to the database
        const expoPushToken = new ExpoPushTokenAdmin({token});
        await expoPushToken.save();

        return res.status(201).json(generateResponse(
            false, 201, 'Success', 'Expo push token saved successfully'
        ));
    } catch (error: any) {
        return res.status(500).json({error: 'An error occurred while saving the token'});
    }
}