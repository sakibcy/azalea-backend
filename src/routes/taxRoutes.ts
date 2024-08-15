import express from "express";
import {addTaxRates, deleteTaxRatesAndFees, getTaxRates, updateTaxRates} from "../controllers/taxController";
import {requireAuth} from "../middleware/auth";

const router = express.Router();

router.get('/taxrates', getTaxRates);
router.post('/taxrates', requireAuth, addTaxRates);
router.put('/taxrates', requireAuth, updateTaxRates);
router.delete('/taxrates/:id', requireAuth, deleteTaxRatesAndFees);

export default router;