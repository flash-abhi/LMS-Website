import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
dotenv.config()
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://lms-website-1-fxb0.onrender.com",
    credentials: true
}));

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/course",courseRouter);
app.use("/api/order",paymentRouter);
app.use("/api/review",reviewRouter);
app.get("/",(req,res)=>{
    res.send("hello from server");
});
   
app.listen(port,() => {
    console.log("Server running on port ",port);
    connectDB(); 
})
