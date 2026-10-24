import express from "express"
import dotenv from "dotenv"
import { fileURLToPath } from "node:url"
dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) })
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


const startServer=async ()=>{
    try {
        await connectDb()
        app.listen(port,()=>{
            console.log("server started")
        })
    } catch (error) {
        console.error("MongoDB connection failed:",error.message)
        process.exit(1)
    }
}

startServer()

