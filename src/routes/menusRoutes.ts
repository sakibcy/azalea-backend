import express from "express";
import addItemToMenus from "../controllers/menusController/addItemsToMenus";
import getMenus from "../controllers/menusController/getMenus";
import getItemById from "../controllers/menusController/getItemById";
import {updateItemOnMenus} from "../controllers/menusController/updateItemOnMenus";
import deleteItemOnMenus from "../controllers/menusController/deleteItemOnMenus";

const router = express.Router();


router.get(`/menus`, getMenus);
router.get(`/menus/:id`, getItemById);
router.post(`/menus`, addItemToMenus);

// update an Existing Menu
router.put(`/menus/:id`, updateItemOnMenus);

// delete an Existing Menu
router.delete(`/menus/:id`, deleteItemOnMenus);

export default router;