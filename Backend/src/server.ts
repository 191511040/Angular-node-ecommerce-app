import { sample_tags } from './../../Frontend/src/data';
import express from 'express';
import dotenv from'dotenv';
dotenv.config()
process.env.MONGO_URI!
import cors from 'cors';
import { sample_foods, sample_users } from './data';
import jwt from "jsonwebtoken";
import foodRouter from './Router/food.router'
import userRouter from './Router/user.router';
import orderRouter from './Router/order.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const app=express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use("/api/foods",foodRouter)
app.use("/api/users",userRouter)
app.use("/api/orders",orderRouter)






 
const port=5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:",port)
})