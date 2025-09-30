import React, { useEffect } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { serverURL } from './../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title,setTitle] = React.useState("");
  const [category,setCategory] = React.useState("");
  const [loading , setLoading] = React.useState(false);
  
const handleCreateCourse = async() => {
    setLoading(true);
    try{
      const result = await axios.post(serverURL+ "/api/course/create",{title,category},{withCredentials:true});
      console.log(result.data);
      setLoading(false);
      toast.success("Course created successfully");
      navigate("/courses");

    }catch(err){
      console.log(err);
      setLoading(false);
      toast.error("Course creation failed")
    }
  }
  return (
    <div className='min-h-screen flex items-start justify-center bg-gray-100 px-4 py-10 '>
        <div className='max-w-xl w-[600px] mx-auto p-6 bg-white rounded-md shadow-md mt-10 relative'>
          <FaArrowAltCircleLeft className='w-[22px] h-[22px] absolute top-[10px] left-[14px]  cursor-pointer' onClick={() => navigate("/courses")}/>
            <h2 className='text-2xl font-semibold mb-6 text-center'>Create Courses</h2>
            <form className='space-y-5 ' onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="title">Course Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id='title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black' placeholder='Enter course title'/>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="cat">Course Category</label>
                <select name="cat" id="cat" onChange={(e) => setCategory(e.target.value)} className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black'>
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
              <button onClick={handleCreateCourse} className='w-full bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' disabled={loading}>{loading ? <ClipLoader size={30} color='white'/> :"Create"}</button>
            </form>
        </div>
    </div>
  )
}

export default CreateCourse;