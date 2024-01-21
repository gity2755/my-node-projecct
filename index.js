import express  from "express";
import { config } from "dotenv";
import morgan from "morgan";
import bookRouter from "./routs/book.js"
import userRouter from "./routs/user.js"
import{connectToDB} from "./config/dbConfig.js"
config();
connectToDB();
const app=express();
app.use(express.json());
app.use(morgan("common"));
app.use("/api/book",bookRouter);
app.use("/api/user",userRouter);


let port=process.env.PORT||3500;
app.listen(port,()=>console.log(`app is listening on port${port}`));