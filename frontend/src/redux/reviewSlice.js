
import { createSlice } from "@reduxjs/toolkit";
const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviewData : []
    },
    reducers: {
        setReviewData : (state,action) =>{
            state.reviewData = action.payload;
        }
    }
});

export const {setReviewData} = reviewSlice.actions;
export const reviewReducer =  reviewSlice.reducer;
export const reviewSelector = state => state.review.reviewData;
