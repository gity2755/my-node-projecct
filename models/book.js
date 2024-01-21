import mongoose from "mongoose";
const bookSchema=mongoose.Schema({
    name:String,
    numPages:Number,
    author:mongoose.Schema({
        firstName:String,
        lastName:String
    }),
    isComix:Boolean,
    publishDate:{type:Date,default:Date.now()}
})
export const BookModel=mongoose.model("books",bookSchema)