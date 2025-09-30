import Razorpay from "razorpay"
import dotenv from "dotenv"
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";
dotenv.config();
const  razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const RazorpayOrder = async (req,res) => {
    try {
        const {courseId} = req.body;
        console.log(courseId)
        const course = await Course.findById(courseId);
        // console.log(course)
        if(!course){
            return res.status(404).json({message: "Course is not found"})
        }
        const options = {
            amount: course.price*100,
            currency: "INR",
            receipt : `${courseId.toString()}`
        }
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        return res.status(200).json(order)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`failed to create razorpay order.`});
    }
}
export const verifyPayment = async (req,res) => {
    try {
        const {courseId,userId,razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            const user = await User.findById(userId);
            console.log("user"+user);
            if(!user.enrolledCourses.includes(courseId)){
                await user.enrolledCourses.push(courseId);
                await user.save();
            }
            const course = await Course.findById(courseId).populate("lectures");
            console.log("course"+course);
            if(!course.enrolledStudents.includes(userId)){
                await course.enrolledStudents.push(userId);
                await course.save();
            }
            return res.status(200).json({message: "payment verified and enrollment successfull."})
        }else{
            return res.status(400).json({message: "payment failed !!"})
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `internal server error during payment verification: ${error}`})
        

    }
}