

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file
//reducers:An object containing Redux "case reducer" functions (functions intended to handle a specific action type, equivalent to a single case statement in a switch).
import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from '../../config/axiosInstance';
const initialState = {
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || undefined,
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false
};
 
// //CreateAsyncThunk is where we perform asychronous tasks in our slice. It receives two parameters name and callback
// //The callback function that performs the API call and returns the result when it is finished
export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        const response = axiosInstance.post("auth/signin", data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed in',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch(error) {
        console.log("printing error", error);
    }
});

export const signup = createAsyncThunk('/auth/signup', async (data) => {
    try {
        const response = axiosInstance.post("auth/signup", data);
        toast.promise(response, {
            loading: 'Submitting form',
            success: 'Successfully signed up',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch(error) {
        console.log("printing error", error);
    }
});
 
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.role = '';
            state.isLoggedIn = false;
            state.data = undefined;
            state.token = '';
        }
    },
        //extraReducers take the information from our asynchronous fetches and then use that data to manipulate global state
    extraReducers: (builder) => {
        //builder.addcase takes stateof promise and reducer and we write how we want to react to the promise
        //payload is complete  response 
        builder
        .addCase(login.fulfilled, (state, action) => {
            console.log(action);
            if(!action.payload) return;
            state.isLoggedIn = (action.payload?.data?.token != undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role", action.payload?.data?.userData?.userType);
            localStorage.setItem("isLoggedIn", (action.payload?.data?.token != undefined));
            localStorage.setItem("data", JSON.stringify(action.payload?.data?.userData));// "{id: 1, name: "abc"}"
            localStorage.setItem("token", action.payload?.data?.token);
        });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;