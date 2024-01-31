import { Book } from "../models/book.js"
import mongoose from "mongoose"
export const getallBook = async (req, res) => {
    let { search } = req.query;
    let perPage = req.query.perPage || 5;
    let page = req.query.page || 1;
    let ex = new RegExp(`${search}`)
    try {
        let filter = {};
        if (search)
            filter.name = ex;
        let allBooks = await Book.find(filter)
            .skip(perPage * (page - 1))
            .limit(perPage);
        res.json(allBooks)
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים " + er.message)
    }
}
export const getBookById = async (req, res) => {
    try {
        let id = req.params.bookid
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let book = await Book.findById(id)
        if (!book)
            return res.status(404).send("מצטערים לא נצמא ספר עם כזה קוד")
        res.json(book)
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בשליפת הנתונים " + er.message)
    }
}
export const deletBookById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let book = await Book.findById(id);
        if (!book)
            return res.status(404).send(" מצטערים לא נמצא ספר עם כזה קוד למחיקה")
        let deleted={};
        if (req.user.role == "admin" || req.user._id == book.ordererID){
            deleted = await Book.findByIdAndDelete(id);}
        res.json(deleted);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה במחיקת הנתונים" + er.message)
    }
}

export const addBook = async (req, res) => {
    let { name,description, numPages, isComix, author, publishDate,url } = req.body;
    if (!name || !numPages)
        return res.status(404).send("שם ומספר עמודים הם חובה");
    try {
        let sameBook = await Book.find({ numPages, name });
        if (sameBook.length > 0)
            return res.status(409).send("כבר קיים ספר עם מספר עמודים ושם זהה ")
        let newBook = new Book({ name,description, numPages, isComix, author, publishDate,url });
        await newBook.save();
        res.json(newBook);
    } catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה בהוספת הנתונים" + er.message)
    }
}
export const updateBook = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send("קוד לא תקין")
        let bookToUpdate = await Book.findById(id);
        if (!bookToUpdate)
            return res.status(404).send(" מצטערים לא נמצא ספר עם כזה קוד לעדכון")
        await Book.findByIdAndUpdate(id, req.body);
        let book = await Book.findById(id)
        res.json(book);
    }
    catch (er) {
        res.status(400).send("מצטערים התרחשה שגיאה במחיקת הנתונים" + er.message)
    }
}
