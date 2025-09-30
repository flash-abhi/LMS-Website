import React from "react";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { SiUikit } from "react-icons/si";
import { SiViaplay } from "react-icons/si";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
const ExploreCourses = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] min-h-[50vh] lg:h-[65vh] flex flex-col lg:flex-row md:items-center  items-start justify-center gap-[30px]  px-[30px]">
      {/* .left/top div */}
      <div className="w-[100%] lg:w-[350px] lg:h-[100%] flex flex-col items-start justify-start gap-1 md:px-[20px] px-[10px]">
        <span className="text-[35px] font-semibold">Explore</span>
        <span className="text-[35px] font-semibold">Our Courses</span>
        <p className="text-[16px]">
          We make learning simple, interactive, and accessible anytime,
          anywhere. Students can explore courses, and learn at their own pace.
          Instructors get powerful tools to create, manage, and share knowledge
          easily. Together, we make education smarter, faster, and more
          engaging.
        </p>
        <button onClick={() => navigate('/allcourses')} className="px-[20px] py-[10px]  sm:my-[20px]  mx-0 border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex justify-center items-center gap-2 mt-[20px] cursor-pointer">
          Explore Courses
          <SiViaplay className="w-[30px] h-[30px] fill-white" />
        </button>
      </div>
      {/* right/bottom div */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center p-[50px]  gap-[40px] flex-wrap ">
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center"><TbDeviceDesktopAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]"/></div>
                Web Dev
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center"><SiUikit className="w-[55px] h-[55px] text-[#6d6c6c]"/></div>
                UI/UX Designing
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center"><MdAppShortcut className="w-[55px] h-[55px] text-[#6d6c6c]"/></div>
                App Dev
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center"><FaHackerrank className="w-[55px] h-[55px] text-[#6d6c6c]"/></div>
                Ethical Hacking
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center"><AiFillOpenAI className="w-[60px] h-[60px] text-[#6d6c6c]"/></div>
                AI/ML
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[hsl(0,0%,43%)] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center"><SiGoogledataproc className="w-[50px] h-[50px] text-[#6d6c6c]"/></div>
                Data Science
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center"><BsClipboardData className="w-[50px] h-[50px] text-[#6d6c6c]"/></div>
                Data Analytics
            </div>
            <div className="w-[100px] h-[130px] font-medium text-[#6d6c6c] text-[13px] flex flex-col gap-3 text-center">
                <div className="w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center"><SiOpenaigym className="w-[50px] h-[50px] text-[#6d6c6c]"/></div>
                AI Tools
            </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
