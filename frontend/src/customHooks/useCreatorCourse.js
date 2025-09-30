import React, { useEffect } from 'react'
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { courseActions, courseSelector } from '../redux/courseSlice';
import axios from 'axios';

const useCreatorCourse = () => {
    const dispatch = useDispatch();
    const creatorData = useSelector(courseSelector);
  useEffect(() => {
   const creatorCourese = async () =>{
    try {
        const result = await axios.get(serverURL+"/api/course/getcreator", {withCredentials: true});
        console.log(result.data);
        dispatch(courseActions.setCreatorCourseData(result.data));
        
    } catch (error) {
        console.log(error);
    }
   }
   creatorCourese();
  },[dispatch]);
}

export default useCreatorCourse