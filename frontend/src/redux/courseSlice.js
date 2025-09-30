import {createSlice} from "@reduxjs/toolkit"
const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorCourseData: [],
        courseData : [],
        selectedCourse : null
    },
    reducers: {
        setCreatorCourseData: (state, action) => {
            state.creatorCourseData = action.payload;
        },
        setCourseData : (state, action) => {
            state.courseData = action.payload;  
        },
        setSelectedCourse : (state,action) => {
            state.selectedCourse = action.payload;
        }
    }
});

export const courseActions  = courseSlice.actions;
export const courseReducer =  courseSlice.reducer;
export const courseSelector = (state) => state.course.creatorCourseData;
export const publishedCourseSelector = (state) => state.course.courseData;
export const selectedCourseSelector = (state) => state.course.selectedCourse;
