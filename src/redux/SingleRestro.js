import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading : true, 
    restaurant : {},
    reviews : [],
};
export const singleRestroSlice = createSlice({
    name : 'single', 
    initialState,
    reducers : {
        restaurantData : (state, action) => {
            state.loading = false;
            state.restaurant = action.payload;
        },
        resetRestaurant : (state)=>{
            state.loading = true;
            state.restaurant = {};
        },
        reviewsRestaurant : (state, action)=>{
            state.loading = false;
            state.reviews = action.payload;
        },
        setLoading : (state, action)=>{
            state.loading = action.payload;
        }
    }
}) 
export const {
    restaurantData,
    resetRestaurant,
    reviewsRestaurant,
    setLoading
} = singleRestroSlice.actions;

export const getRestaurantById = (id)=> async(dispatch, getState)=> {
    try {
        dispatch(setLoading(true));
        let prevRestaurant = getState().singleRestaurant.restaurant;
        if(prevRestaurant && prevRestaurant._id === id){
            return;
        }
        const response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/${id}`);
        dispatch(restaurantData(response.data));
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export const UpdateRestaurant = (id, body)=> async(dispatch, getState)=> {
    try {
        const {token} = getState().login
        const response = await axios.patch(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/${id}`, {...body, token : token});
        dispatch(resetRestaurant());
        dispatch(restaurantData(response.data));
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export const getReviewById = (id, order)=> async(dispatch)=> {
    try {
        let response;
        if(order){
            response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/rating/${id}?sort=${order}`);
        } else {
            response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/rating/${id}`);
        }
        dispatch(reviewsRestaurant(response.data));
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export const postReview = (body) => async (dispatch, getState) => {
    try {
        const { token } = getState().login;
        await axios.post('https://restaurant-backend-bitcs.herokuapp.com/rating/post', {...body, token : token});
        dispatch(getReviewById(body.restaurantId));
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export const updateReview = (restaurantId,reviewId, body) => async (dispatch) => {
    try {
        await axios.patch(`https://restaurant-backend-bitcs.herokuapp.com/rating/${reviewId}`, body);
        dispatch(getReviewById(restaurantId))
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export const removeReview = (id, restaurantId)=> async (dispatch) => {
    try {
        await axios.delete(`https://restaurant-backend-bitcs.herokuapp.com/rating/${id}`);
        dispatch(getReviewById(restaurantId));
    }
    catch(err) {
        throw new Error(err.message);
    }
}
export default singleRestroSlice.reducer