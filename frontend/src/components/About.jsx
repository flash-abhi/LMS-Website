import React from 'react'
import aboutImg from "../assets/about.jpg";
import video from "../assets/video.mp4";
import {TfiLayoutLineSolid} from "react-icons/tfi";
import { BsFillPatchCheckFill } from 'react-icons/bs';
const About = () => {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
        {/* for image area */}
        <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
            <img src={aboutImg} className='w-[80%] h-[90%] rounded-lg' alt="about" />
            <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'> 
                <video src={video} autoPlay controls loop  className='w-full rounded-xl shadow-lg border-2 border-white'/>
            </div>
        </div>
        {/* for about */}
        <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px] '>
            <div className='flex text-[35px] lg:[40px] lg:font-semibold items-center justify-center gap-[20px] py-[20px]'>About Us <TfiLayoutLineSolid className='w-[40px] h-[40px]'/> </div>
            <div className='md:text-[30px] text-[30px] lg:text-[28px] '>We Are Maximizing Your Learning Growth</div>
            <div className='text-[15px] text-gray-8000'>We Provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.</div>
            <div className='w-[100%] lg:w-[60%]'>
                <div className='flex items-center justify-between mt-[40px]'>
                    <div className='flex items-center justify-center gap-[10px]'> <BsFillPatchCheckFill className='w-[20px] h-[20px]'/> Simplified Learning </div>
                    <div className='flex items-center justify-center gap-[10px]'> <BsFillPatchCheckFill className='w-[20px] h-[20px]'/> Expert Trainers </div>
                </div>
                <div className='flex items-center justify-between mt-[40px]'>
                    <div className='flex items-center justify-center gap-[10px]'> <BsFillPatchCheckFill className='w-[20px] h-[20px]'/> Good Experience </div>
                    <div className='flex items-center justify-center gap-[10px]'> <BsFillPatchCheckFill className='w-[20px] h-[20px]'/> Lifetime Access </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default About