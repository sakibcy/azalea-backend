import { DB } from "../config"
import mongoose from 'mongoose'
import winston from 'winston'

// Add the missing properties to the ConnectOptions interface
interface ConnectOptions extends mongoose.ConnectOptions {
    useUnifiedTopology?: boolean;
    useNewUrlParser?: boolean;
}

module.exports = function () {
    const dbString = DB ?? "default_db_string";
    try {
        mongoose.connect(dbString);
        winston.info(`Connected to database: ${dbString} `);
    } catch (err) {
        console.log(err)
    }
}

// async function () {
//     const dbString = DB ?? "default_db_string";
//     try {
//         mongoose.set('strictQuery', false)
//         mongoose.connect(dbString)
//         winston.info(`Connected to database: ${dbString} `);
//     } catch (error) {
//         console.log(error);
//
//     }
// }