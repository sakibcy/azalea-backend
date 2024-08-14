import {Request, Response} from "express";
import {generateResponse} from "../utils/generateResponse";

const Tax = require('../models/Tax');

export const getTaxRates = async (req: Request, res: Response) => {
    const taxRates = await Tax.find();

    if (!taxRates) {
        return res
            .status(404)
            .json(generateResponse(true, 404, 'Error', 'No tax rates found'));
    }

    return res.json(taxRates);
}

export const addTaxRates = async (req: Request, res: Response) => {
    const {name, rate} = req.body;

    if (!name || !rate) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'Name and rate must be provided'));
    }

    const taxRate = new Tax({name, rate});

    try {
        const savedTax = await taxRate.save();

        return res
            .status(201)
            .json({
                ...generateResponse(false, 201, 'Success', 'Tax Rate Added Successfully!'),
                tax: savedTax
            });
    } catch (error) {
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'Saving into Database Failed'))
    }
}

export const updateTaxRates = async (req: Request, res: Response) => {
    try {
        const {name, rate} = req.body;

        if (!name || !rate) {
            return res
                .status(400)
                .json(generateResponse(true, 400, 'Error', 'Name and rate must be provided'));
        }

        const tax = await Tax.findOne({name});

        if (!tax) {
            return res
                .status(404)
                .json(
                    generateResponse(true, 404, 'Error',
                        'Please provide a valid tax name, example: State Tax, Country Tac')
                );
        }

        tax.name = name;
        tax.rate = rate;

        try {
            const updatedTax = await tax.save();

            return res
                .status(200)
                .json({
                    ...generateResponse(false, 200, 'Success', 'Tax Updated Successfully!'),
                    tax: updatedTax
                });
        } catch (error: any) {
            console.log(`Error: ${error.message}`);
            return res
                .status(400)
                .json(generateResponse(true, 400, 'Error', 'Saving failed'))
        }
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
        return res
            .status(400)
            .json(generateResponse(true, 400, 'Error', 'Something went worng'));
    }
}

