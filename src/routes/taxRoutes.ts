import express from "express";
import {addTaxRates, getTaxRates, updateTaxRates} from "../controllers/taxController";
import {requireAuth} from "../middleware/auth";

const router = express.Router();

router.get('/taxrates', getTaxRates);
router.post('/taxrates', requireAuth, addTaxRates);
router.put('/taxrates', requireAuth, updateTaxRates);

export default router;