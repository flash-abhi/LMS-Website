import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: JSON.parse(localStorage.getItem("userData")) || null,
        loading: true,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
        clearUserData: (state) => {
            state.userData = null;
            state.loading = false;
            localStorage.removeItem("userData");
        },
        
    }
});

export const userActions  = userSlice.actions;
export const userReducer =  userSlice.reducer;
export const userSelector = (state) => state.user.userData;
export const userLoadingSelector = (state) => state.user.loading;