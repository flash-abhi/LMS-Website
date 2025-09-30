import  { use, useEffect, useRef, useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom';
import empty from '../../assets/empty.jpg';
import { FaEdit } from "react-icons/fa";
import { serverURL } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, publishedCourseSelector } from '../../redux/courseSlice';

function EditCourse() {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const thumb =  useRef();
  const {courseId} = useParams();
  const [selectCourse , setSelectCourse] = useState(null);
  const [title,setTitle] = useState("");
  const [subTitle,setSubtitle] = useState("");
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [level,setLevel] = useState("");
  const [price,setPrice] = useState(0);
  const [frontendImage,setFrontendImage] = useState(empty);
  const [backendImage,setBackendImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const [loading1,setLoading1] = useState(false);
  const dispatch = useDispatch();
  const courseData = useSelector(publishedCourseSelector);

  const handleThumbnail = (e) => {
   const file = e.target.files[0];
   setBackendImage(file);
   setFrontendImage(URL.createObjectURL(file));
  }

  const getCourseById = async() => {
    try {
      const result = await axios.get(serverURL+`/api/course/getcourse/${courseId}`,{withCredentials:true});
      setSelectCourse(result.data.course);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(selectCourse){
      setTitle(selectCourse.title || "");
      setSubtitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || 0);
      setIsPublished(selectCourse?.isPublished || false);
      setFrontendImage(selectCourse.thumbnail || empty);
    }
  },[selectCourse])

  useEffect(() => {
    getCourseById();
  },[]);

  const handleEditCourse = async() => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title",title);
      formData.append("subTitle",subTitle);
      formData.append("description",description);
      formData.append("category",category);
      formData.append("level",level);
      formData.append("price",price);
      formData.append("thumbnail",backendImage);
      formData.append("isPublished",isPublished);
      const result = await axios.post(serverURL+`/api/course/editcourse/${courseId}`,formData,{withCredentials:true});
      console.log(result.data);
      const updateData = result.data.course;

    // ✅ Update courseData in redux properly
    let updatedCourses = [...courseData];
    const existingIndex = updatedCourses.findIndex(c => c._id === courseId);

    if (existingIndex !== -1) {
      updatedCourses[existingIndex] = updateData;
    } else if (updateData.isPublished) {
      updatedCourses.push(updateData);
    }

    dispatch(courseActions.setCourseData(updatedCourses));
      setLoading(false);
      toast.success("course Updated Successfully !!");
      navigate("/courses");

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Course Updation failed !!");
      setLoading(false);
    }
  }

  const handleRemoveCourse = async() => {
    setLoading1(true);
    try{
      const result = await axios.delete(serverURL+`/api/course/remove/${courseId}`,{withCredentials:true});
      console.log(result.data);
      setLoading1(false);
      const filterCourse = courseData.filter((course,i) => course._id !== courseId);
      dispatch(courseActions.setCourseData(filterCourse));
      toast.success("Course removed successfully");
      navigate("/courses");

    }catch(err){
      console.log(err);
      setLoading1(false);
      toast.error("Course removal failed");
    }
  }


  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
        {/* top bar */}
        <div className='flex items-center justify-between gap-y-[10px] gap-x-[60px] md:justify-between flex-col md:flex-row mb-6 relative'>
          <span className='w-[100px] h-[20px] '><FaArrowAltCircleLeft className=' absolute left-0 md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/courses")}/></span>
          <h2 className='text-2xl font-semibold text-center w-full'>
            Add Detail Information regarding the Course
          </h2>
          <div className=' flex space-x-2 '>
            <button  className='  bg-black whitespace-nowrap text-white px-4 py-2 rounded-md hover:bg-gray-700' onClick={() => navigate(`/createlecture/${selectCourse._id}`)}>
              Go to lectures page
            </button>
          </div>
        </div>
        {/* form details */}
        <div className='bg-gray-50 p-6 rounded-md'>
          <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
          <div className='space-x-2 space-y-2'>
            {!isPublished?
            <button className='bg-green-100 text-green-600 px-4 py-2 hover:bg-green-200 rounded-md border-1 cursor-pointer' onClick={() => setIsPublished(prev => !prev)}>Click to Publish</button>:
            <button className='bg-red-100 text-red-600 px-4 py-2 hover:bg-red-200 rounded-md border-1 cursor-pointer' onClick={() => setIsPublished(prev => !prev)}>Click to Unpublish</button>
            }
            <button className='bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer' disabled={loading1} onClick={handleRemoveCourse}> {loading1 ? <ClipLoader/> : "Remove Course"} </button>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
              <div>
                <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
                <input type="text"id='title' onChange={(e) => setTitle(e.target.value)} value={title} className='w-full border px-4 py-2 rounded-md' placeholder='Course Title' />
              </div>
              <div>
                <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>Subtitle</label>
                <input type="text"id='subtitle' onChange={(e) => setSubtitle(e.target.value)} value={subTitle} className='w-full border px-4 py-2 rounded-md' placeholder='Course Subtitle' />
              </div>
              <div>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea  id='description' onChange={(e) => setDescription(e.target.value)} value={description} className='w-full border px-4 py-2 rounded-md h-24 resize-none'  placeholder='Course Description' ></textarea>
              </div>
              <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
                {/* for category */}
                <div className='flex-1'>
                  <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
                  <select name="" onChange={(e) => setCategory(e.target.value)} value={category} id="category" className='w-full border px-4 py-2 rounded-md bg-white'>
                    <option>Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI UX Designing">UI UX Designing</option>
                    <option value="App Development">App Development</option>
                    <option value="AI Tools">AI Tools</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Ethical Hacking">Ethical Hacking</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                {/* for level */}
                <div className='flex-1'>
                  <label htmlFor="level" className='block text-sm font-medium text-gray-700 mb-1'>Course Level</label>
                  <select onChange={(e) => setLevel(e.target.value)} value={level} id="level" className='w-full border px-4 py-2 rounded-md bg-white'>
                    <option>Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advance">Advance</option>
                  </select>
                </div>
                {/* for price */}
                <div className='flex-1'>
                  <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>Course Price (INR)</label>
                  <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} id="price" placeholder='₹ 0' className='w-full border px-4 py-2 rounded-md'/>
                </div>
                
              </div>
              <div className='flex-1'>
                  <label htmlFor="thumbnail">Course Thumbnail</label>
                  <input type="file" id="thumbnail" onChange={handleThumbnail} hidden ref={thumb} accept='image/*'/>
                </div>
                <div className='relative w-[300px] h-[170px]'>
                  <img src={frontendImage} className='w-[100%] h-[100%] border-1 object-cover border-black rounded-[5px] ' alt="" onClick={() => thumb.current.click()} />
                  <FaEdit className='w-[20px] h-[20px] absolute top-2 right-2' onClick={() => thumb.current.click()}/>
                </div>
              <div className='flex items-center justify-start gap-[15px]'>
                <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-7 py-2 rounded-md' onClick={() => navigate('/courses')}>Cancel</button>
                <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' disabled={loading} onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color='white'/>:"Save"}</button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default EditCourse