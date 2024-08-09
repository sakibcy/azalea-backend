import {Request, Response} from 'express';

const Cart = require('../../models/Cart');
const Menu = require('../../models/Menu');

export default async (req: Request, res: Response) => {
    try {
        const menus = req.body.menus;

        const cart = new Cart({menus});

        const cartDoc = await cart.save();

        await decreaseQuantity(menus);

        res.status(200).json({
            success: true,
            cartId: cartDoc.id
        });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
}

async function decreaseQuantity(menus: any[]) {
    let bulkOptions = menus.map(item =>{
        return {
            updateOne: {
                filter: { _id: item.menu},
                update: { $inc: { quantity: -item.quantity}}
            }
        }
    });

    await Menu.bulkWrite(bulkOptions);
}