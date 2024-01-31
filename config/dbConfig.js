// export const connectToDB=()=>{
//     mongoose.connect(`${mongoURI}/${process.env.DB_NAME||"library"}`).then((suc)=>{console.log(`mongodb is connected on host${suc.connection.host}`)})
// .catch(err=>{
//     console.log(err);
//     console.log("cannot connect mongodb");
//     process.exit(1);
// }
// )
// }

import mongoose, { mongo } from "mongoose";

//דרך שניה 
export const connectToDB=async()=>{
try{
let con= await mongoose.connect(process.env.DB_CONNECTION||"mongodb+srv://gity2755:nisy6742@cluster0.qktwfoy.mongodb.net/?retryWrites=true&w=majority");
console.log(`mongodb is connected on host${con.connection.host}`);}
catch(err){    
console.log(err);
console.log("cannot connect mongodb");    
process.exit(1);
}}