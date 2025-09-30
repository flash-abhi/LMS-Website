import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {  courseActions } from '../redux/courseSlice';
import axios from 'axios';
import { serverURL } from '../App';

const getPublishedCourse = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchPublishedCourses = async () => {
            try {
                const response = await axios.get(serverURL + "/api/course/getpublished", { withCredentials: true });
                console.log("Published Courses:", response.data.courses);
                dispatch(courseActions.setCourseData(response.data.courses));
            }catch (error) {
                console.error("Error fetching published courses:", error);
            }
        }
        fetchPublishedCourses();
    },[dispatch]);
  
}

export default getPublishedCourse