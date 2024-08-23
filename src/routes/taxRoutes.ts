import express from "express";
import {addTaxRates, deleteTaxRatesAndFees, getTaxRates, updateTaxRates} from "../controllers/taxController";
import {requireAuth} from "../middleware/auth";

const router = express.Router();

router.get('/tax-rates', getTaxRates);
router.post('/tax-rates', requireAuth, addTaxRates);
router.put('/tax-rates', requireAuth, updateTaxRates);
router.delete('/tax-rates/:id', requireAuth, deleteTaxRatesAndFees);

export default router;