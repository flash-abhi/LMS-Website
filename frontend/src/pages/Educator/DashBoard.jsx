import React from 'react'
import { useSelector } from 'react-redux';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {userSelector} from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom';
import { courseSelector } from '../../redux/courseSlice';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
const DashBoard = () => {
  const navigate = useNavigate();
  const userData = useSelector(userSelector);
  const creatorCourseData = useSelector(courseSelector);

  const CourseProgressData = creatorCourseData?.courses?.map((course) => ({
    name: course.title?.slice(0,10) + "...",
    lectures : course?.lectures?.length || 0,
  }))|| [];

  const EnrolledData = creatorCourseData?.courses?.map((course) => ({
    name: course.title?.slice(0,10) + "...",
    enrolled : course?.enrolledStudents?.length || 0,
  }))|| [];

  const totalEarning = creatorCourseData?.courses?.reduce((sum,course) =>{
    const studentCount = course.enrolledStudents.length || 0;
    const courseRevenue = course.price ? course.price * studentCount: 0;
    return sum + courseRevenue;
  } ,0) || 0

  return (
    <div className='flex-min-h-screen bg-gray-100'>
      <FaArrowAltCircleLeft className='w-[22px] absolute  lg:left-2 lg:top-3 md:top-13 md:left-2 ml-[10px] top-[10%] left-[5%] h-[22px] cursor-pointer' onClick={() => navigate("/")}/>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10 sm:px-[10px]'>
        {/* main section */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md  p-6  flex flex-col md:flex-row items-center gap-6'>
          <img src={userData?.photoUrl || userData.name.slice(0,1).toUpperCase()} alt="profile" className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md '/>
          <div className='text-center md:text-left space-y-1'>
            <h1 className='text-2xl font-bold text-gray-800 '>Welcome, {userData?.name || 'Educator'} 👋</h1>
            <h1 className='text-xl font-semibold text-gray-800'>Total Earning : ₹ {totalEarning}</h1>
            <p className='text-sm text-gray-600'>{userData?.description || "Start creating courses for your students."}</p>
            <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate('/courses')}>Create Courses</h1>
          </div>
        </div>
        {/* graph section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* for course Progress graph */}
          <div className="bg-white rounded-lg shadow-md p-6"> 
            <h2 className='text-lg font-semibold mb-4'>
              Course Progress (Lectures)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="lectures" fill='green' radius={[5,5,1,1]}/>
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Enrolled Data */}

          <div className="bg-white rounded-lg shadow-md p-6"> 
            <h2 className='text-lg font-semibold mb-4'>
              Students Enrollments
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrolledData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="enrolled" fill='green' radius={[5,5,1,1]}/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>
      </div>
    </div>
  )
}

export default DashBoard