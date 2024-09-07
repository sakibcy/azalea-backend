import express from "express";
import expoPushTokenAdminController from "../controllers/expoPushTokenAdminController";
import {requireAuth} from "../middleware/auth";

const router = express.Router();

router.post('/save-expo-push-token-admin',requireAuth, expoPushTokenAdminController);

export default router;