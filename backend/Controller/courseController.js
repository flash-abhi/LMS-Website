import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import User from './../model/userModel.js';

export const createCourse = async (req, res) => {
    try {
        const {title, category } = req.body;
        if(!title || !category) {
            return res.status(400).json({ success: false, message: "Title and category are required" });
        }
        const course = new Course({ title, category, creator: req.userId });
        await course.save();
        return res.status(201).json({ success: true, message: "Course created successfully", course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` CreateCourse error :  ${error.message}` });
    }
}

export  const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate("lectures reviews");
        if(!courses) {
            return res.status(404).json({ success: false, message: "No published courses found" });
        }
        return res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` failed to find isPublished Courses. error :  ${error.message}` });
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ creator: req.userId }).populate("reviews");
        if(!courses) {
            return res.status(404).json({ success: false, message: "No courses found for this creator" });
        }
        return res.status(200).json({ success: true, courses });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` failed to find creator Courses. error :  ${error.message}` });
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, subTitle, description, category, level, price, isPublished} = req.body;
        let thumbnail 
        if(req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path);
        }
        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        const updateData = {title, subTitle, description, category, level, price, isPublished, thumbnail}
        course  = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
        return res.status(200).json({ success: true, message: "Course updated successfully", course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` EditCourse error :  ${error.message}` });
    }   
}

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({ success: true, course });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` GetCourseById error :  ${error.message}` });
    }
}

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        let course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        course = await Course.findByIdAndDelete(courseId,{new:true});
        return res.status(200).json({ success: true, message: "Course removed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: ` RemoveCourse error :  ${error.message}` });
    }
}


// for Lecture

export const createLecture = async(req,res)=> {
    try {
       const {lectureTitle} = req.body;
       const {courseId} = req.params;
       if(!lectureTitle || !courseId ){
        return res.status(400).json({message:"Lecture Title is Required."});
       }
       const lecture = await Lecture.create({lectureTitle});
       const course = await Course.findById(courseId);
       if(course){
        course.lectures.push(lecture._id);
       }
       await course.save();
       await course.populate("lectures");
       return res.status(201).json({lecture,course})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "failed to create the lecture"});
    }
}

export const getCourseLecture = async(req,res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message: "No course Found"})
        }
        await course.populate("lectures");
        await course.save();
        return res.status(200).json({course})

    } catch (error) {
        console.log(error);
        return res.status(404).json({message: "failed to find the lecture"});
    }
}
export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params;
        const {isPreviewFree,lectureTitle} = req.body;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({message:"lecture not found"})
        }
        let videoUrl ;
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl;
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle;
        }
        lecture.isPreviewFree = isPreviewFree;
        await lecture.save();
        return res.status(200).json({lecture})
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: "failed to edit the lecture"});
    }
}

export const removeLecture = async (req,res)=>{
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture) {
            return res.status(404).json({message: "Lecture not found"});
        }
        await Course.updateOne(
            {lectures: lectureId},
            {$pull: {lectures: lectureId}}
        )
        return res.status(200).json({message: "Lecture Removed"});
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: "failed to remove the lecture"});
    }
}

// get Creator

export const getCreatorById = async(req,res) => {
    try {
        const {userId} = req.body;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `failed to get Creator ${error}`})
        
    }
}