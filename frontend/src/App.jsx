import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import useCurrentUser from './customHooks/useCurrentUser'
import Profile from './pages/Profile'
import { useSelector } from 'react-redux'
import { userLoadingSelector, userSelector } from './redux/userSlice'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import { ClipLoader } from 'react-spinners'
export const serverURL =  "https://lms-website-26nf.onrender.com";
import Dashboard from './pages/Educator/DashBoard';
import Courses from './pages/Educator/Courses';
import CreateCourse from './pages/Educator/CreateCourse'
import EditCourse from './pages/Educator/EditCourse'
import useCreatorCourse from './customHooks/useCreatorCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourseDetail from './pages/ViewCourseDetail'
import ScrollToTop from './components/ScrollToTop'
import ViewLectures from './pages/ViewLectures'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import getAllReviews from './customHooks/getAllReviews'
import SearchWithAI from './pages/SearchWithAI'
const App = () => {
    useCurrentUser();
    useCreatorCourse();
    getPublishedCourse();
    getAllReviews();
    const userData = useSelector(userSelector);
    const loading = useSelector(userLoadingSelector);
    if(loading){
        return <div className='min-h-screen flex items-center justify-center'><ClipLoader size={30} color='blue'/></div>
    }
  return (
    <>
        <ScrollToTop/>
        <ToastContainer/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={!userData?<SignUp/>: <Navigate to={"/"}/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/profile' element={userData ? <Profile/>: <Navigate to={"/login"}/>}/>
            <Route path='/allcourses' element={userData ? <AllCourses/>: <Navigate to={"/login"}/>}/>
            <Route path='/forget' element={<ForgetPassword/>}/>
            <Route path='/editprofile' element={userData ? <EditProfile/>: <Navigate to={"/login"}/>}/>
            <Route path='/dashboard' element={userData?.role === 'educator' ? <Dashboard/>: <Navigate to={"/login"}/>}/>
            <Route path='/courses' element={userData?.role === 'educator' ? <Courses/>: <Navigate to={"/login"}/>}/>
            <Route path='/createcourse' element={userData?.role === 'educator' ? <CreateCourse/>: <Navigate to={"/login"}/>}/>
            <Route path='/editcourse/:courseId' element={userData?.role === 'educator' ? <EditCourse/>: <Navigate to={"/login"}/>}/>
            <Route path='/createlecture/:courseId' element={userData?.role === 'educator' ? <CreateLecture/>: <Navigate to={"/login"}/>}/>
            <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === 'educator' ? <EditLecture/>: <Navigate to={"/login"}/>}/>
            <Route path='/viewcourse/:courseId/' element={userData ? <ViewCourseDetail/>: <Navigate to={"/login"}/>}/>
            <Route path='/viewlecture/:courseId/' element={userData ? <ViewLectures/>: <Navigate to={"/login"}/>}/>
            <Route path='/mycourses' element={userData ? <MyEnrolledCourses/>: <Navigate to={"/login"}/>}/>
            <Route path='/search' element={userData ? <SearchWithAI/>: <Navigate to={"/login"}/>}/>
        </Routes>
    </>
  )
}

export default App
