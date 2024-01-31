import express from "express"
import mongoose from "mongoose";
import* as bookController from "../controllers/book.js"

import {auth,authAdmin} from '../middlewares/auth.js'
const router = express.Router();
router.get("/", bookController.getallBook)
router.get("/:bookid",bookController.getBookById )
router.delete("/:id",authAdmin,bookController.deletBookById)
router.post("/",authAdmin,bookController.addBook)
router.put("/:id",authAdmin, bookController.updateBook)
export default router;