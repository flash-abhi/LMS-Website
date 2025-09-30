import {createTransport} from "nodemailer";
import dotenv from "dotenv";
dotenv.config()
const transporter = createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to,otp) => {
     const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "RESET YOUR PASSWORD",
    html: `<p>Your OTP for Password Reset is <b>${otp}</b>. It expires in 5 minutes.</p>`, // HTML body
  });
}

export default sendMail;