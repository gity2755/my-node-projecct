import mongoose from "mongoose";
import Joi from 'joi';
let minimalOrder=mongoose.Schema(
    {
        itemID:String,
        itemName:String,
        qty:Number
    }
);
const today = new Date();
const tomorrow = new Date()
let orderSchema = mongoose.Schema({
    orderDate:{type:Date,default:Date.now()},
    dueDate: {type:Date,default:tomorrow.setDate(today.getDate() + 7)},
    shipingAdress: {
        country: String,
        city: String,
        street: String,
        building: Number,
        PostalCode:Number
    },
    userID: String,
    items:[minimalOrder],
    isOut:{type:Boolean,default:false} 
})
export const Order = mongoose.model("orders", orderSchema);

export const orderValidator = (_order) => {
    const schema = Joi.object(
        {
            userID :Joi.string().min(3).max(30).required(),
            shipingAdress: Joi.object().keys({
                country: Joi.string().required().allow(''),
                city: Joi.string().required().allow(''),
                street: Joi.string().required().allow(''),
                building: Joi.number().required()}),
                items:Joi.array().items(
                    Joi.object().keys({
                        itemID: Joi.string().required(),
                        itemName: Joi.string().required().allow(''),
                        qty:Joi.number().required()})
            )
        }
    )
    return schema.validate(_order);
}