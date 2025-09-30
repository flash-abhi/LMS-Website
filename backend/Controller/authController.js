import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genrateToken from "../config/token.js";
import sendMail from "../config/sendMail.js";
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({ message: "User already exist !!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Strong Password" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    let token = await genrateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Signup error ${err}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found !!" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect Password !!" });
    }
    let token = await genrateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Login error ${err}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: `Logout Error ${err}` });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found !!" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP Send Successfully!!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Send OTP error : ${err.message}` });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = true;
    await user.save();
    return res.status(200).json({ message: "OTP Verified Successfully!!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: ` OTP not verified : ${err.message}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(404).json({ message: "OTP Verification is Required." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password Reset Successfull !!" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: ` Reset password error : ${err.message}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }
    let token = await genrateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: `GoogleAuth error : ${err.message}` });
  }
};
