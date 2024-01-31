import mongoose from "mongoose";
import URL from "mongoose-type-url"
import Joi from "joi";
const bookSchema=mongoose.Schema({
    name:String,
    description:String,
    numPages:Number,
    author:mongoose.Schema({
        firstName:String,
        lastName:String
    }),
    isComix:Boolean,
    publishDate:{type:Date,default:Date.now()},
    url:URL
})
export const Book=mongoose.model("books",bookSchema);
export const bookValidationForAdd = (_book) => {
    const schema = Joi.object(
        {
            name:Joi.string().min(3).max(30).required(),
            description:Joi.string(),
            numPages: Joi.string().min(0).pattern(new RegExp(`^[1-9][0-9]*(\. [0-9]+)? |0+\. [0-9]*[1-9][0-9]*$`)).required(),
            publishDate:Joi.date().pattern(`(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[1,2])-(19|20)\d{2}`),
            url:Joi.string().uri()
        }
    );
    return schema.validate(_book);
}