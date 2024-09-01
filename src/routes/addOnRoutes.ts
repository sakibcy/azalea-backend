import express from "express";
import multer from "multer";
import {requireAuth} from "../middleware/auth";
import addAddOn from "../controllers/addOnControllers/addAddOn";
import getAddOn from "../controllers/addOnControllers/getAddOn";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// get all addons
router.get(`/addon`, getAddOn);
// router.get(`/addon/:id`, getAddOnById);

router.post(`/addon`, requireAuth, upload.single('image'), addAddOn);

// update an Existing AddOn
// router.put(`/addon/:id`, requireAuth, upload.single('image'), updateAddOn);
//
// // delete an Existing AddOn
// router.delete(`/addon/:id`, requireAuth, deleteAddOn);

export default router;