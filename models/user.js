import mongoose from "mongoose";
import Joi from 'joi';
let userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: String,
    role: String ,
    registerDate: { type: Date, default: Date.now() }
})
export const User = mongoose.model("users", userSchema);
export const userValidationForLogin = (_user) => {
    const schema = Joi.object(
        {
            userName: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,15}`)).required(),
        }
    );
    return schema.validate(_user);
}
export const userValidator = (_user) => {
    const schema = Joi.object(
        {
            userName: Joi.string().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp(`^[a-zA-Z0-9]{3,15}`)).required(),
            email:Joi.string().email().required(),
            role: Joi.string().regex(/^(user|admin)$/).required()
            //add check if role is user or admin
        }
    );
    return schema.validate(_user);
}