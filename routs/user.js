import express from "express"
import mongoose from "mongoose";
const router=express.Router();
router.get("/",(req,res)=>{
 res.send("get all users")
})

router.get("/:userid",(req,res)=>{
    res.send("get user with id: "+ req.params.userid)
})
router.delete("/:userid",(req,res)=>{
    res.send("delete user with id: "+ req.params.userid)
})
router.post("/",(req,res)=>{
    console.log(req.body);
    res.send("create new user with name "+req.body.userid)
})
router.put(":/id",(req,res)=>{
    console.log(req.body);
   res.send("updated user with id "+req.body.id+"to name "+req.body.name );
})
export default router;