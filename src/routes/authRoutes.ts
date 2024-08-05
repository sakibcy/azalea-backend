import express from "express";
import { loginPost, register } from "../controllers/authController";

const router = express.Router();

router.post(`/login`, loginPost);
router.post(`/register`, register);

export default router;