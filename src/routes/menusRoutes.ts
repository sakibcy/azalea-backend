import express from "express";
import addItemToMenus from "../controllers/menusController/addItemToMenus";
import getMenuBySlug from "../controllers/menusController/getMenuBySlug";
import {updateItemOnMenus} from "../controllers/menusController/updateItemOnMenus";
import deleteItemOnMenus from "../controllers/menusController/deleteItemOnMenus";
import getMenus from "../controllers/menusController/getMenus";
import multer from "multer";
import getMenuById from "../controllers/menusController/getMenuById";
import {requireAuth} from "../middleware/auth";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(`/menu`, getMenus);
router.get(`/menu/:id`, getMenuById);
router.get(`/menu/by-slug/:slug`, getMenuBySlug);



router.post(`/menu`, requireAuth, upload.single('image'), addItemToMenus);

// update an Existing Menu
router.put(`/menu/:id`, requireAuth, upload.single('image'), updateItemOnMenus);

// delete an Existing Menu
router.delete(`/menu/:id`, requireAuth, deleteItemOnMenus);

export default router;