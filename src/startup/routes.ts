import express, { Application } from "express";

import authRoutes from "../routes/authRoutes";
import { API_VERSION } from "../config";

module.exports = function (app: Application) {
    const middleware = [
        express.json(),
        express.urlencoded({extended: true}),
        require('cookie-parser')()
    ]

    app.use(middleware);

    // app.use(`/${API_VERSION}/languagesv2`, v2_languages);
    app.use(`/`, authRoutes);
    // app.use(`/authenticated`, authenticated);
}