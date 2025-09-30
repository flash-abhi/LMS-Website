import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg"
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { GiSplitCross } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { userActions, userSelector } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
const Navbar = () => {
    const [show ,setShow] = useState(false);
    const [showHamburger, setShowHamburger] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector(userSelector);
    // console.log(userData);
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            const result = await axios.get(serverURL + "/api/auth/logout",{withCredentials:true})
            dispatch(userActions.setUserData(null))
            toast.success("Logout successfully")
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Logout failed");
        }
    }
  return (
    <div>
       <div className='w-[100%] h-[80px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
            <img src={logo} alt="" onClick={() => navigate("/")} className='w-[60px] rounded-[5px] border-2 border-white cursor-pointer'/>
        </div>
        <div className='w-[30%] lg:flex  items-center justify-center gap-4 hidden'>
           {!userData && <IoPersonCircleSharp className="w-[50px] h-[50px] fill-black cursor-pointer" onClick={() => setShow(!show)}/>}
           {userData?.photoUrl ? <img src={userData?.photoUrl} alt="profile-pic" className="w-[50px] h-[50px] rounded-full cursor-pointer" onClick={() => setShow(prev => !prev)} /> :
            <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer flex-shrink-0" onClick={() => setShow(prev => !prev)}>{userData?.name.slice(0,1).toUpperCase()}</div>}
            {userData?.role ==="educator" &&<div className="px-[20px] py-[10px] border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer" onClick={()=> navigate("/dashboard")}>Dashboard</div>}
            { !userData ? <span className="px-[20px] py-[10px] border-2 border-white text-white  rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer bg-[#000000d5]" onClick={() => navigate('/login')}>Login</span>:
            <span className="px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer" onClick={handleLogout}>LogOut</span>}
             {show && <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
                <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" onClick={() => navigate("/profile")}>My Profile</span>
                <span className="bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600" onClick={() => navigate('/mycourses')}> My Courses</span>
            </div>}
        </div>
        {!showHamburger ?<FaBars className="w-[36px] h-[36px] font-bold lg:hidden fill-white cursor-pointer z-11" onClick={() => setShowHamburger(!showHamburger)}/>: <GiSplitCross className="w-[30px] h-[30px]  lg:hidden fill-white cursor-pointer z-11" onClick={() => setShowHamburger(!showHamburger)}/>}
         <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHamburger ? "translate-x-[0%] transition duration-500 ": "translate-x-[-100%] transition duration-500 "}`}>
            {!userData &&  <IoPersonCircleSharp className="w-[80px] h-[80px] fill-black cursor-pointer " />}
            {userData?.photoUrl ? <img src={userData?.photoUrl}alt="" className="w-[80px] h-[80px] rounded-full cursor-pointer" /> :
            <div className="w-[80px] h-[80px] rounded-full text-white flex items-center justify-center text-[40px] border-2 bg-black border-white cursor-pointer flex-shrink-0" onClick={() => setShow(prev => !prev)}>{userData?.name.slice(0,1).toUpperCase()}</div>}
            {<div className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light gap-2 cursor-pointer" onClick={() => navigate("/profile")}>My Profile</div>}
            {<div className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light gap-2 cursor-pointer" onClick={() => navigate('/mycourses')}>My Courses</div>}
            {userData?.role ==="educator" &&<div className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light gap-2 cursor-pointer" onClick={()=> navigate("/dashboard")}>Dashboard</div>}
            { !userData ? <span className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light gap-2 cursor-pointer" onClick={() => navigate('/login')}>Login</span>:
            <span className="w-[200px] h-[50px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[18px] font-light gap-2 cursor-pointer" onClick={handleLogout}>LogOut</span>}
        </div>
       </div>
    </div>
  )
}

export default Navbar;