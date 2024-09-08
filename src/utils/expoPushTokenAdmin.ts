import Expo from "expo-server-sdk";
import ExpoPushTokenAdmin, {IExpoPushTokenAdmin} from "../models/ExpoPushTokenAdmin";

const expo = new Expo();

interface IExpoPushTokenAdminMessage {
    to: string;
    sound: string;
    title: string;
    body: string;
    data: {
        order_id: string;
    };
}

export const sendNewOrderNotificationToAdmin = async (orderId: string, userName: string) => {
    const tokens: IExpoPushTokenAdmin[] = await ExpoPushTokenAdmin.find();

    let messages: any[] = [];

    for (const token of tokens) {
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(token.expoPushToken)) {
            console.error(`Push token ${token.expoPushToken} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: token.expoPushToken,
            sound: "default",
            title: "New Order",
            body: `New order received! from: ${userName}`,
            data: {
                order_id: orderId,
            },
        });
    }

    let chunks = expo.chunkPushNotifications(messages);

    for (const chunk of chunks) {
        try {
            const receipt = await expo.sendPushNotificationsAsync(chunk)
            console.log(receipt);
        } catch (error) {
            console.error('Error sending push notification', error);
        }
    }
}