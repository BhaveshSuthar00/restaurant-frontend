import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users : [],
};

export const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        getUsers : (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        }
    }
})
export const {
    getUsers, 
    setLoading
} = userSlice.actions;

export const getAllUsers = ()=> async(dispatch)=>{
    try {
        const users = await axios.get('https://restaurant-backend-bitcs.herokuapp.com/user/getAll');
        dispatch(getUsers(users.data));
    }
    catch(err) {
        throw new Error(err.message);
    }
}

export const deleteUser = (id)=> async(dispatch, getState) => { 
    try {
        const { token } = getState().login;
        const user = await axios.post(`https://restaurant-backend-bitcs.herokuapp.com/user/${id}`, {method : "DELETE", token : token});
        dispatch(getAllUsers(user));
    }
    catch(err) {
        throw new Error(err.message);
    }
}

export const updateUser = (id, body)=> async(dispatch) =>{
    try {
        await axios.patch(`https://restaurant-backend-bitcs.herokuapp.com/user/${id}` , body);
        dispatch(getAllUsers());
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export default userSlice.reducer;