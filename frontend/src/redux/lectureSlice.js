import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name: "lecture",
    initialState:{
        lectureData :[]
    },
    reducers: {
        setLectureData : (state,action) =>{
            state.lectureData = action.payload
        }
    }
});

export const {setLectureData} = lectureSlice.actions;
export const lectureReducer =  lectureSlice.reducer;
export const lectureSelector = (state) => state.lecture.lectureData;
