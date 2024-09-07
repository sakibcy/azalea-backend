import express, { Application } from "express";
import cors from 'cors';

import authRoutes from "../routes/authRoutes";
import menusRoutes from "../routes/menusRoutes";
import cartRoutes from "../routes/cartRoutes";
import taxRoutes from "../routes/taxRoutes";
import orderRoutes from "../routes/orderRoutes";
import addOnRoutes from "../routes/addOnRoutes";
import expoPushNotificationRoutes from "../routes/expoPushNotificationRoutes";


module.exports = function (app: Application) {
    const middleware = [
        express.json(),
        express.urlencoded({extended: true}),
        require('cookie-parser')()
    ]
    
    app.use(cors())
    app.use(middleware);

    
    app.use(`/`, authRoutes);
    app.use(`/`, menusRoutes);
    app.use(`/`, addOnRoutes);
    app.use(`/`, cartRoutes);
    app.use(`/`, taxRoutes);
    app.use(`/`, orderRoutes);
    app.use(`/`, expoPushNotificationRoutes);
    // app.use(`/authenticated`, authenticated);
}