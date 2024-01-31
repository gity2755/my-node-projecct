import express from "express"
import mongoose from "mongoose";
import {auth,authAdmin} from"../middlewares/auth.js"
import * as userController from "../controllers/user.js"
const router = express.Router();
router.get("/",authAdmin,userController.getAllUsers)
router.post("/",userController.addUser)
router.post("/login",userController.login)


export default router;