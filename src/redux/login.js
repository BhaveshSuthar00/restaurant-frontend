import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialState = {
    token : cookies.get('currentU') ? cookies.get('currentU').token : '' ,
    userName : cookies.get('currentU') ? cookies.get('currentU').name : '' ,
    userId : cookies.get('currentU') ? cookies.get('currentU').userId : '' ,
    userType : cookies.get('currentU') ? cookies.get('currentU').user : '' ,
    isLoggedIn : cookies.get('currentU') ? true : false,
    isLoggedOut : cookies.get('currentU') ? false : true
}
export const loginSlice = createSlice({
    name : "login",
    initialState,
    reducers : {
        userLogin : (state, action) =>{
            state.isLoggedIn = true;
            state.isLoggedOut = false;
            state.token = action.payload.token;
            state.userName = action.payload.name;
            state.userType = action.payload.user;
            state.userId = action.payload.userId;
        },
        userLoggout : (state) =>{
            state.isLoggedIn = false;
            state.isLoggedOut = true;
            state.token = '';
            state.userName = '';
            state.userType = '';
            state.userId = '';
            cookies.remove('currentU', {path: '/'})
        }
    }
})
export const {
    userLogin,
    userLoggout
} = loginSlice.actions;
export const signUpUser = (userInfo)=> async (dispatch)=>{
    try {
        const dataPost = await axios.post('https://restaurant-backend-bitcs.herokuapp.com/user/post', userInfo);
        dispatch(userLogin(dataPost.data))
        cookies.set('currentU', dataPost.data, { path: '/' });
    }
    catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}
export const addUserByAdmin = (userInfo)=> async (dispatch)=>{
    try {
        await axios.post('https://restaurant-backend-bitcs.herokuapp.com/user/post', userInfo);
    }
    catch (err) {
        throw new Error(err.message)
    }
}
export const loginUser = (userInfo)=> async (dispatch)=>{
    try {
        const getUser = await axios.post('https://restaurant-backend-bitcs.herokuapp.com/user/login', {...userInfo, method : "GET"})
        if(getUser.data){
            dispatch(userLogin(getUser.data))
            cookies.set('currentU', getUser.data, { path: '/' });
        }
    }   
    catch (err) {
        console.log(err , 'error is this')
        throw new Error(err.message)
    }
}
// https://restaurant-l23.herokuapp.com/user/getall
export default loginSlice.reducer;