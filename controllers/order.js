import { Order } from "../models/order.js"
import { User } from "../models/user.js"
import { orderValidator } from "../models/order.js"
import jwt from "jsonwebtoken"

import mongoose from "mongoose"
export const getallOrders = async (req, res) => {
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;
    try {
        let allOrders = await Order.find()
            .skip(perPage * (page - 1))
            .limit(perPage);
        res.json(allOrders)
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים " + er.message)
    }
}
export const getMyOrders = async (req, res) => {
    try {
        let token = req.headers["xxx-token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let userID = decoded._id;
        let allOrders = await Order.find({ userID })
        res.json(allOrders)
    }

    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים " + er.message)
    }
}
export const deletOrderById = async (req, res) => {
    try {
        let { id } = req.params;
        let token = req.headers["xxx-token"];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);//חילוץ האיי די מהטוקן
        let order = await Order.findById(id);//מציאת ההזמנה שרותים למחוק
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        if (!order)
            return res.status(404).send(" מצטערים לא נמצא הזמנה עם כזה קוד למחיקה")
        console.log("order",order.userID);
        console.log("decoded role" ,decoded.role);

        if (decoded.role == "admin" || decoded._id == order.userID) {//אם המבקש הוא מנהל או  המזמין
            let deleted = {};
            deleted = await Order.findByIdAndDelete(id);
            res.json(deleted);
        }
        else
            return res.status(400).send("you are not premitted");
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה במחיקת הנתונים" + er.message)
    }
}


//פונקציה עבור התאריך הגעה של ההזמנה.
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
var date = new Date();
console.log(date.addDays(5));




export const addOrder = async (req, res) => {
    let { shipingAdress, userID, items } = req.body;
    let validate = orderValidator(req.body);
    if (validate.error)
        return res.status(400)
            .json({ type: "not valid body", message: validate.error.details[0] })
    try {
        let newOrder = new Order({ orderDate: Date.now(), dueDate: date.addDays(7), shipingAdress: shipingAdress, userID: userID, items: items, isOut: false });
        await newOrder.save();
        res.json(newOrder);
    } catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשמירת הנתונים" + er.message)
    }
}
export const updateOrder = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד הזמנה לא תקין")
        let orderToUpdate = await Order.findById(id);
        if (!orderToUpdate)
            return res.status(404).send(" מצטערים לא נמצא הזמנה עם כזה קוד לעדכון")
        orderToUpdate.isOut=true;
        await Order.findByIdAndUpdate(id,orderToUpdate)
        let order = await Order.findById(id)
        res.json(order);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בעדכון הנתונים" + er.message)
    }
}
