import { generateToken } from "../config/generateToken.js";
import { User, userValidationForLogin, userValidator } from "../models/user.js"
import { hash, compare } from "bcrypt"
export const addUser = async (req, res) => {
    let { userName, password,email,role } = req.body;
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400)
            .json({ type: "not valid body", message: validate.error.details[0] })
    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName },{password:password}] })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with similar details is already exist" })
        let hashPassword = await hash(password, 15);
        let newUser = new User({userName, password: hashPassword, email, role })
        await newUser.save();
        // let token = generateToken(newUser);
        // console.log("token"+token.json);
        return res.json({_id:newUser._id,userName:newUser.userName,email:newUser.email,role:newUser.role,registerDate:Date.now()});
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}
export const login = async (req, res) => {
    let { userName, password } = req.body;
    let validate = userValidationForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valied body", message: validate.error.details[0] })
    try {
        let user = await User.findOne({ userName: userName });
        if (!user || !await compare(password, user.password))
             res.status(404).json({ type: "no such user", message: "please sign up" });
        let token=generateToken(user);
        return res.json({token,userName:user.userName,email:user.email,role:user.role});
    }
    catch (err) {
         res.status(400).json({ type: "error", message: err.message });
    }
}
export const getAllUsers = async (req, res) => {
    try {
        let allUsers =await User.find({}, "-password")// ימצא את כולם ויחזיר הכל חוץ מהקוד
            return  res.json(allUsers);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ type: "error", message: err.message })
    }
}


