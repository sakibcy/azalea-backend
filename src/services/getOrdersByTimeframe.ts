// services/orderService.ts

const Order = require('../models/Order');

export const getOrdersByTimeframe = async (timeframe: string) => {
    let matchStage: { format?: string } & { [key: string]: any } = {};

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    switch (timeframe) {
        case 'daily':
            matchStage = {
                timeframe: {
                    $dateToString: {
                        format: "%Y-%m-%d", date: "$created"
                    }
                }
            };
            break;
        case 'weekly':
            matchStage = {
                year: { $isoWeekYear: "$created" },  // ISO week year
                week: { $isoWeek: "$created" },  // ISO week number
            };
            break;
        case 'monthly':
            matchStage = {
                timeframe: {
                    $dateToString: { format: "%Y-%m", date: "$created" }
                }
            };
            break;
        case 'yearly':
            matchStage = {
                timeframe: {
                    $dateToString: {
                        format: "%Y", date: "$created"
                    }
                }
            };
            break;
        default:
            throw new Error('Invalid timeframe');
    }

    const pipeline = [];

    if (timeframe === 'daily') {
        pipeline.push({
            $match: {
                created: { $gte: startOfMonth }
            }
        });
    }

    pipeline.push(
        {
            $unwind: "$items"  // Unwind items array
        },
        {
            $group: {
                _id: matchStage,
                totalOrders: { $sum: 1 },
                totalWithOutTaxAndFees: { $sum: "$subTotalPrice" },
                totalTaxAndFees: { $sum: "$taxAndFeesPriceTotal" },
                totalIncludingTaxAndFees: { $sum: "$totalPrice" },
                totalItems: { $sum: 1 },  // Each unwinded item counts as one
                totalQuantity: { $sum: "$items.quantity" },  // Sum the quantities of all items
            }
        },
        {
            // Optional: Sort by the timeframe for better readability
            $sort: { "_id.timeframe": 1 }
        }
    );

    const orders = await Order.aggregate(pipeline);

    return orders;
};