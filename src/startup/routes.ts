import express, { Application } from "express";

import authRoutes from "../routes/authRoutes";
import menusRoutes from "../routes/menusRoutes";
import cors from 'cors';
import cartRoutes from "../routes/cartRoutes";
import taxRoutes from "../routes/taxRoutes";


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
    app.use(`/`, cartRoutes);
    app.use(`/`, taxRoutes);
    // app.use(`/authenticated`, authenticated);
}