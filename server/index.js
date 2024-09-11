import express from "express"
import dotenv from "dotenv"
import uesrRoute from "./Route/userRoute.js"
import authRoute from "./Route/authRoute.js"
import { listiningRoute } from "./Route/LisitiningRout.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



import mongdbconnection from "./mongodb-connection.js";
mongdbconnection();

app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,
}));

app.get("/",(req,res)=>{
    res.send("Server is running ")
})

app.use("/user",uesrRoute);
app.use("/auth",authRoute);
app.use("/listining",listiningRoute);
app.listen(3001,()=>{
    console.log("server is running on the port 3001")
})