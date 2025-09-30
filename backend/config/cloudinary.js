
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
const uploadOnCloudinary = async(filePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});
try{
    if(!filePath){
        return null;
    }
    const uploadResult = await cloudinary.uploader.upload(filePath,
        {resource_type: "auto"}  //folder name where we want to store the files
    );
    fs.unlinkSync(filePath); //to remove file from local storage after uploading to cloudinary
    return uploadResult.secure_url
}catch(err){
    console.log(err);
    fs.unlinkSync(filePath);
}
}
export default uploadOnCloudinary;