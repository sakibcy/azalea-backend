import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_NAME, SALT_ROUND_DB } from "../config";
import { generateResponse } from "../utils/generateResponse";
const Auth = require("../models/Auth");

const maxAge = 30 * 24 * 60 * 60; // 30 days

const createToken = (id: any) => {
    // Use the environment variable for the secret key
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: maxAge,
    });
};

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json(
                    generateResponse(true, 400, "Bad Request", "You must enter an email")
                );
        }

        if (!password) {
            return res.status(400).json(generateResponse(true, 400, "Bad Request", "You must enter a password"));
        }

        const isEmail = validator.isEmail(email);
        const isLength = validator.isLength(password, { min: 6, max: undefined });

        if (!isEmail) {
            return res.status(400).json(
                generateResponse(true, 400, "Bad Request", "Email is not valid")
            );
        }

        if (!isLength) {
            return res.status(400).json(
                generateResponse(true, 400, "Bad Request", "Password should be at least 6 characters")
            );
        }


        const existingUser = await Auth.findOne({ email });

        if (existingUser) {
            return res.status(401).json(
                generateResponse(true, 401, "Unauthorized", "User already exists")
            );
        }


        const user = new Auth({
            email: email,
            password
        });

        const salt = await bcrypt.genSalt(SALT_ROUND_DB);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        if (registeredUser) {
            const token = createToken(registeredUser.id);
            res.setHeader(JWT_TOKEN_NAME, token).cookie(JWT_TOKEN_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });
    
            return res.status(201).json({
                error: false,
                code : 201,
                type: "success",
                message: "User created successfully",
                "x-auth-token": token, 
            });
        } else {
            return res.status(500).json(
                generateResponse(true, 500, "Internal Server Error", "An error occurred")
            );
        }
    } catch (error) {
        return res.status(500).json(
            generateResponse(true, 500, "Internal Server Error", "An error occurred")
        );
    }
};

export const loginPost = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res
                .status(400)
                .json(
                    generateResponse(true, 400, "Bad Request", "You must enter an email")
                );
        }

        if (!password) {
            return res.status(400).json(generateResponse(true, 400, "Bad Request", "You must enter a password"));
        }

        const user = await Auth.findOne({ email });
        // res.send(user.password)
        // console.log(user.password);
        
        if (!user) {
            return res.status(400).json(
                generateResponse(true, 400, "Unauthorized", "No user found for this email address")
            );
        }

        if (user && !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json(
                generateResponse(true, 400, "Unauthorized", "Incorrect password")
            );
        }

        const token = createToken(user.id);
        if (!token) {
            throw new Error("Invalid token")
        }

        res.setHeader(JWT_TOKEN_NAME, token).cookie(JWT_TOKEN_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });

        return res.status(200).json({
            error: false,
            code : 200,
            type: "success",
            message: "Logged in successfully",
            "x-auth-token": token,
        });
    } catch (error) {
        return res.status(500).json(
            generateResponse(true, 500, "Internal Server Error", "An error occurred")
        );
    }
};
