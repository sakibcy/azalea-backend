import {Request, Response} from "express";
import {generateResponse} from "../../utils/generateResponse";
import {getOrdersByTimeframe} from "../../services/getOrdersByTimeframe";

export default async (req: Request, res: Response) => {
    const {timeframe} = req.params;

    try {
        const stats = await getOrdersByTimeframe(timeframe);
        res.status(200).json(stats);
    } catch (err: any) {
        res.status(500).json(
            generateResponse(true, 500, 'Error', err.message)
        );
    }
}