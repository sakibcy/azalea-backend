import express, { Application } from "express";

import authRoutes from "../routes/authRoutes";
import menusRoutes from "../routes/menusRoutes";
import { API_VERSION } from "../config";
import cors from 'cors';


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
    // app.use(`/authenticated`, authenticated);
}