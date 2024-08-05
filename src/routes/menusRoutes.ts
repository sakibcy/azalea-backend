import express from "express";
import { deleteItemOnMenus, getMenus, getItemById, addItemToMenus, updateItemOnMenus } from "../controllers/menusController";

const router = express.Router();


router.get(`/menus`, getMenus);
router.get(`/menus/:id`, getItemById);
router.post(`/menus`, addItemToMenus);

// update an Existing Menu
router.put(`/menus/:id`, updateItemOnMenus);

// delete an Existing Menu
router.delete(`/menus/:id`, deleteItemOnMenus);

export default router;