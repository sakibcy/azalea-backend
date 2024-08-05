import { Request, Response } from "express";

const Menus = require("../models/menusSchema")

export const getMenus = async (req: Request, res: Response) => {
    try {
        const items = await Menus.find();
        res.json(items);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getItemById = async (req: Request, res: Response) => {
    try {
        const item = await Menus.findOne({ id: req.params.id });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json(item)
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const addItemToMenus = async (req: Request, res: Response) => {
    const { image, name, price, category, description } = req.body;

    const item = new Menus({
        image,
        name,
        price,
        category,
        description
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const updateItemOnMenus = async (req: Request, res: Response) => {
    try {
        const {
            image,
            name,
            price,
            category,
            description
        } = req.body;

        const item = await Menus.findOne({ id: req.params.id });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.image = image || item.image;
        item.name = name || item.name;
        item.price = price || item.price;
        item.category = category || item.category;
        item.description = description || item.description;


        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
}

export const deleteItemOnMenus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const item = await Menus.findOne({ id });
        if (!item) {
            return res.status(404).json({ message: 'No item found' });
        }

        await Menus.deleteOne({ id });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}