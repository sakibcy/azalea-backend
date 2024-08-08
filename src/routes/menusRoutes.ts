import express from "express";
import addItemToMenus from "../controllers/menusController/addItemToMenus";
import getMenuBySlug from "../controllers/menusController/getMenuBySlug";
import {updateItemOnMenus} from "../controllers/menusController/updateItemOnMenus";
import deleteItemOnMenus from "../controllers/menusController/deleteItemOnMenus";
import getMenus from "../controllers/menusController/getMenus";
import multer from "multer";
import getMenuById from "../controllers/menusController/getMenuById";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(`/menu`, getMenus);
router.get(`/menu/:id`, getMenuById);
router.get(`/menu/by-slug/:slug`, getMenuBySlug);



router.post(`/add`, upload.single('image'), addItemToMenus);

// update an Existing Menu
router.put(`/menu/:id`, updateItemOnMenus);

// delete an Existing Menu
router.delete(`/menu/:id`, deleteItemOnMenus);

export default router;