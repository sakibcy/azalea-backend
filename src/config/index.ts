import dotenv from "dotenv";
dotenv.config();

const { PORT, DB } = process.env;
const API_VERSION = 'v1';

const JWT_TOKEN_NAME = 'x-auth-token';
const SALT_ROUND_DB = 10;

export {
    PORT,
    DB,
    JWT_TOKEN_NAME,
    SALT_ROUND_DB,
    API_VERSION
};