import express from 'express';
import addCart from "../controllers/cartControllers/addCart";

const router = express.Router();

router.post('/cart', addCart);

export default router;