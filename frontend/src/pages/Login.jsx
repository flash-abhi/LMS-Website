import { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import {  userActions } from '../redux/userSlice';
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
const Login = () => {
    const [show , setShow] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async() =>{
        setLoading(true);
      try{
        const result = await axios.post(serverURL + "/api/auth/login",{email,password},{withCredentials: true});
        // console.log(result.data);
        dispatch(userActions.setUserData(result.data));
        setLoading(false);
        navigate('/');
        toast.success("Login Successfull !!");
      }catch(err){
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.message);
      }
    }
    const googleSignIn =  async () => {
        try{
            const response = await signInWithPopup(auth,provider);
            console.log(response);
            let user = response.user
            let name = user.displayName;
            let email = user.email;
            let role = ''
            const result = await axios.post(serverURL+ "/api/auth/googleauth",{name,email,role},{withCredentials:true})
            dispatch(userActions.setUserData(result.data));
            navigate('/');
            toast.success("Login Successfull !!");
        }catch(err){
            console.log(err);
            toast.error("Login failed !!");
        }
    }
  return (
   <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
           <form action="" onSubmit={(e)=> e.preventDefault()} className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
               {/* left div */}
               <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                   <div>
                       <h1 className='font-semibold text-black text-2xl'>Welcome back!!</h1>
                       <h2 className='text-[#999797] text-[18px]'>Login to your account</h2>
                   </div>
                   <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                       <label htmlFor="email" className='font-semibold'>Email</label>
                       <input type="email" id='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='your email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' />
                   </div>
                   <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                       <label htmlFor="password" className='font-semibold'>Password</label>
                       <input type={show?"text" : "password"} id='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='your password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' />
                       {show ?<IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)}/>:
                       <IoEyeOffOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={() => setShow(prev => !prev)}/>}
                   </div>
                   
                   <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' disabled={loading} onClick={handleLogin}>{loading? <ClipLoader size={30} color='white'/>:"Login"}</button>
                   <span className='text-[13px] cursor-pointer text-[#585757] ' onClick={() => navigate("/forget")}>Forget password ? </span>
                   <div className='w-[80%] flex items-center gap-2'>
                       <div className='w-[30%] h-[2px] bg-[#c4c4c4]'></div>
                       <div className='w-[40%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>continue with</div>
                       <div className='w-[30%] h-[2px] bg-[#c4c4c4]'></div>
                   </div>
                   <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleSignIn}>
                       <img src={google} className='w-[25px]' alt="" />
                       <span className='text-[18px] text-gray-500'>oogle</span>
                   </div>
                   <div className="text-[#6f6f6f]">
                    Create new account? <span className='text-black cursor-pointer' onClick={() => navigate('/signup')}>Sign up</span>
                </div>
               </div>
               {/* right div */}
               <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
                   <img src={logo} alt="logo" className='w-30 shadow-2xl'  />
                   <span className='text-2xl text-white'>VIRTUAL COURSES</span>
   
               </div>
           </form>
       </div>
  )
}

export default Login