import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate({
    path: "enrolledCourses",
    model: "Course"
  });
        if(!user) {
            return res.status(404).json({ success: false, message: "User does not found" });
        }
        return res.status(200).json({ success: true, user });

    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        res.status(500).json({ success: false, message: "Get current user error!!" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { description,name } = req.body;
        let photoUrl 
        if(req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path) // Assuming you're using multer to handle file uploads
        }
        const user = await User.findByIdAndUpdate(userId, {name,description,photoUrl}).populate("enrolledCourses");
        if(!user) {
            return res.status(404).json({ success: false, message: "User does not found" });
        }
        await user.save();
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ success: false, message: "Update profile error!!" });
    }
}