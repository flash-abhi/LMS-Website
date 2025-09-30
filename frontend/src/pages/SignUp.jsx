import { use, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverURL } from '../App';
import {ClipLoader} from 'react-spinners';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
const SignUp = () => {
    const [show , setShow] = useState(false);
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("student");
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSignUp = async () =>{
        setLoading(true);
        try{
            const result = await axios.post(serverURL+ "/api/auth/signup",{name,email,password,role},{withCredentials: true});
            console.log(result.data);
            dispatch(userActions.setUserData(result.data));
            setLoading(false);
            navigate('/');
            toast.success("Signup Successfull !!");
        }catch(err){
            console.log(err);
            setLoading(false);
            toast.error("Signup failed !!");
        }
    }
    const googleSignUp =  async () => {
        try{
            const response = await signInWithPopup(auth,provider);
            console.log(response);
            let user = response.user
            let name = user.displayName;
            let email = response.user.email;
            const result = await axios.post(serverURL+ "/api/auth/googleauth",{name,email,role},{withCredentials:true})
            dispatch(userActions.setUserData(result.data));
            navigate('/');
            toast.success("Signup Successfull !!");
        }catch(err){
            console.log(err);
            toast.error("Signup failed !!");
        }
    }
  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form action="" onSubmit={(e) => e.preventDefault()} className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
            {/* left div */}
            <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                <div>
                    <h1 className='font-semibold text-black text-2xl'>let's get started</h1>
                    <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
                </div>
                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                    <label htmlFor="name" className='font-semibold'>Name</label>
                    <input type="text" id='name' onChange={(e) => setName(e.target.value)} value={name} placeholder='your name' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' />
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
                <div className="flex md:w-[50%] w-[70%] items-center justify-between">
                    <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer  ${role==='student'? "border-black": "border-[#646464]"}`} onClick={() => setRole('student')}>Student</span>
                    <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-2xl cursor-pointer  ${role==='educator'? "border-black": "border-[#646464]"}`} onClick={() => setRole('educator')}>Educator</span>
                </div>
                <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignUp} disabled={loading}>{loading? <ClipLoader size={30} color='white'/>  :"Sign up"}</button>
                <div className='w-[80%] flex items-center gap-2'>
                    <div className='w-[30%] h-[2px] bg-[#c4c4c4]'></div>
                    <div className='w-[40%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>continue with</div>
                    <div className='w-[30%] h-[2px] bg-[#c4c4c4]'></div>
                </div>
                <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleSignUp}>
                    <img src={google} className='w-[25px]' alt="" />
                    <span className='text-[18px] text-gray-500'>oogle</span>
                </div>
                <div className="text-[#6f6f6f]">
                    already have an account? <span className='text-black cursor-pointer' onClick={() => navigate('/login')}>Login</span>
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

export default SignUp