import dotenv from "dotenv";
dotenv.config();

const { PORT, DB } = process.env;
const API_VERSION = 'v1';

const JWT_TOKEN_NAME = 'x-auth-token';
const SALT_ROUND_DB = 10;

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string;
const AWS_REGION = process.env.AWS_REGION as string; // e.g., 'us-east-1'
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as  string;

export {
    PORT,
    DB,
    JWT_TOKEN_NAME,
    SALT_ROUND_DB,
    API_VERSION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET_NAME
};