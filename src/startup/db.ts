import { DB } from "../config"
import mongoose from 'mongoose'
import winston from 'winston'

// Add the missing properties to the ConnectOptions interface
interface ConnectOptions extends mongoose.ConnectOptions {
    useUnifiedTopology?: boolean;
    useNewUrlParser?: boolean;
}

module.exports = async function () {
    const dbString = DB ?? "default_db_string";
    try {
        await mongoose.connect(dbString);
        winston.info(`Connected to database: ${dbString} `);
    } catch (error) {
        console.log(error);
        
    }
}