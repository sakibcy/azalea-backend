// services/orderService.ts

const Order = require('../models/Order');

export const getOrdersByTimeframe = async (timeframe: string) => {
    let matchStage: any = {};

    switch (timeframe) {
        case 'daily':
            matchStage = {
                $dateToString: {format: "%Y-%m-%d", date: "$createdAt"}
            };
            break;
        case 'weekly':
            matchStage = {
                $isoWeek: {date: "$createdAt"}
            };
            break;
        case 'monthly':
            matchStage = {
                $dateToString: {format: "%Y-%m", date: "$createdAt"}
            };
            break;
        case 'yearly':
            matchStage = {
                $dateToString: {format: "%Y", date: "$createdAt"}
            };
            break;
        default:
            throw new Error('Invalid timeframe');
    }

    const orders = await Order.aggregate([
        {
            $unwind: "$items"  // Unwind items array
        },
        {
            $group: {
                _id: {
                    timeframe: {$dateToString: {format: matchStage.$dateToString.format, date: "$created"}}
                },
                totalOrders: {$sum: 1},
                totalWithOutTaxAndFees: {$sum: "$subTotalPrice"},
                totalTaxAndFees: {$sum: "$taxAndFeesPriceTotal"},
                totalIncludingTaxAndFees: {$sum: "$totalPrice"},
                totalItems: {$sum: 1},  // Each unwinded item counts as one
                totalQuantity: {$sum: "$items.quantity"},  // Sum the quantities of all items
            }
        },
        {
            // Optional: Sort by the timeframe for better readability
            $sort: {"_id.timeframe": 1}
        }
    ]);

    return orders;
};