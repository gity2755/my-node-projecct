import express from "express"
import mongoose from "mongoose";
import * as orderController from "../controllers/order.js"

import {auth,authAdmin} from '../middlewares/auth.js'
const router = express.Router();
router.get("/",authAdmin, orderController.getallOrders)//*
router.get("/myOrders",auth,orderController.getMyOrders )//איך מחלצים מטוקן את האיי די???
router.delete("/:id",orderController.deletOrderById)// ואיך שולחים לשנ האימותים ולבדוק אם אחד מהם נכון
router.post("/",auth,orderController.addOrder)//*
router.put("/:id",authAdmin,orderController.updateOrder)//*

export default router;