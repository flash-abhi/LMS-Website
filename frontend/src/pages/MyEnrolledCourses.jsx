import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from './../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import useCurrentUser from '../customHooks/useCurrentUser';

const MyEnrolledCourses = () => {
    const userData = useSelector(userSelector);
    // console.dir("hello from myenrolledCourses"+userData)
    console.dir(userData);
    const navigate = useNavigate();
    useCurrentUser();

  return (
    <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
        <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")}/>
        <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>My Enrolled Courses</h1>
        {
            userData?.enrolledCourses.length === 0 ? (
                <p className='text-gray-500 text-center w-full'>
                    You haven't enrolled in any course yet.
                </p>
            ) : ( 
           <div className='flex items-center justify-center flex-wrap gap-[30px]'> 
                {userData?.enrolledCourses?.map((course,index) => (
                    <div key={index} className='bg-white rounded-2xl shadow-md overflow-hidden border-2'>
                        <img className='w-full h-40 object-cover' src={course?.thumbnail} alt="" />
                        <div className='p-4 '>
                            <h2 className='text-lg font-semibold text-gray-800'>{course?.title}</h2>
                            <p className='text-sm text-gray-600 mb-2'>{course?.category}</p>
                            <p className='text-sm text-gray-600 mb-2'>{course?.level}</p>
                            <h1 onClick={() => navigate(`/viewlecture/${course?._id}`)} className='px-[10px] py-[10px] text-center border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer mt-[10px] hover:bg-gray-600'>Watch Now</h1>
                        </div>
                    </div>
                ))}
           </div>
           )
        }
    </div>
  )
}

export default MyEnrolledCourses