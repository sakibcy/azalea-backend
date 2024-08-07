import express from "express";
import addItemToMenus from "../controllers/menusController/addItemToMenus";
import getItemBySlug from "../controllers/menusController/getItemBySlug";
import {updateItemOnMenus} from "../controllers/menusController/updateItemOnMenus";
import deleteItemOnMenus from "../controllers/menusController/deleteItemOnMenus";
import getMenus from "../controllers/menusController/getMenus";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(`/menu`, getMenus);
router.get(`/menu/:slug`, getItemBySlug);



router.post(`/add`, upload.single('image'), addItemToMenus);

// update an Existing Menu
router.put(`/menu/:id`, updateItemOnMenus);

// delete an Existing Menu
router.delete(`/menu/:id`, deleteItemOnMenus);

export default router;