import React, { use } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const Profile = () => {
  const userData = useSelector(userSelector);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowAltCircleLeft
          className="w-[30px] h-[30px] fill-[#3d3b3b] cursor-pointer absolute top-5 left-5"
          onClick={() => navigate('/')}
        />
        <div className="flex flex-col items-center text-center">
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              alt="profile"
              className="w-30 h-30 rounded-full object-cover border-4 border-black"
            />
          ) : (
            <div className="w-[70px] h-[70px] rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-[#3d3d3d] border-white cursor-pointer flex-shrink-0">
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4 text-gray-700">{userData.name}</h2>
          <p className="text-sm text-gray-500">{userData.role}</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="text-sm ">
            <span className="font-semibold text-gray-700"><b>Email :</b> &nbsp;</span>
            <span>{userData.email}</span>
          </div>
          <div className="text-sm ">
            <span className="font-semibold text-gray-700"><b>Bio :</b>  &nbsp;</span>
            <span>{userData.description}</span>
          </div>
          <div className="text-sm ">
            <span className="font-semibold text-gray-700"><b>Enrolled Courses :</b> &nbsp;</span>
            <span>{userData.enrolledCourses.length}</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => navigate("/editprofile")} className="px-5 py-2 rounded bg-[#3d3d3d] text-white active:bg-[#4b4b4b] cursor-pointer transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
