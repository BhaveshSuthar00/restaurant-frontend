import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    restaurant : [],
    loading: false,
    totalPages: 0,
    ratingFilter : 0,
    limit : 4,
    fetchCategory : "getall", 
    currentPage: 1,
    search : '',
}

export const counterSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        restaurantData : (state, action) => {
            state.restaurant = [];
            state.totalPages = 0;
            state.restaurant = action.payload.restaurant;
            state.loading = false;
            state.totalPages = action.payload.totalPages;
        },
        setLoading : (state, action) => {
            state.loading =  action.payload;
        },
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload;
        },
        setFilter : (state,action) => {
            state.ratingFilter = 0;
            state.ratingFilter = action.payload;
        },
        setCategory : (state,action) => {
            state.fetchCategory = action.payload;
        },
        setRest : (state,action) => {
            state.restaurant = action.payload;
        },
        setSearchGlobal : (state,action) => {
            state.search = action.payload;
        }
    }
})

export const {
    setSearchGlobal, 
    setRest,
    restaurantData,
    setCategory,
    setFilter,
    setCurrentPage,
    setLoading
} = counterSlice.actions
export const postRestaurant = (RestroInfo)=> async (dispatch, getState) => {
    try {
        const {token} = getState().login;
        await axios.post('https://restaurant-backend-bitcs.herokuapp.com/restaurant/post', {...RestroInfo, token : token});
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export const fetchRestaurants = ()=> async(dispatch, getState)=>{
    try {
        dispatch(setLoading(true));
        dispatch(setFilter(0));
        dispatch(setSearchGlobal(''));
        const { currentPage, fetchCategory, limit } = getState().restaurant;
        if(fetchCategory !== 'getall'){
            dispatch(setCategory('getall'));
        }
        let response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/getall?page=${currentPage}&size=${limit}`);
        dispatch(restaurantData(response.data));
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export const fetchRestaurantsBySearch = ()=> async(dispatch, getState)=>{
    try {
        dispatch(setLoading(true));
        const { currentPage, search, limit } = getState().restaurant;
        if(search.length === 0){
            dispatch(setCategory('getall'));
            dispatch(handleChange());
            return;
        }
        let response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/search?search=${search}&size=${limit}&page=${currentPage}`);
        if(response.data.restaurant.length > 0) {
            dispatch(setCategory('search'));
            dispatch(restaurantData(response.data));
        } else {
            if(response.data.totalPages === 0){
                throw new Error('no data found');
            }
        }
    }
    catch (err) {
        dispatch(setCategory('getall'));
        dispatch(handleChange());
        throw new Error(err.message);    
    }
}
export const fetchRestaurantsByFilter = () => async (dispatch, getState)=>{
    try {
        const { currentPage, limit , ratingFilter} = getState().restaurant;
        const response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/getall?page=${currentPage}&size=${limit}&sort=${ratingFilter}`)
        if(response.data.restaurant.length > 0) {
            dispatch(restaurantData(response.data))
        } else {
            if(response.data.totalPages === 0){
                dispatch(setCategory('getall'));
                dispatch(handleChange());
                throw new Error('no data found');
            } 
            if(currentPage > 1){
                dispatch(setCurrentPage(currentPage-1));
                dispatch(fetchRestaurantsByFilter());
            }
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export const deleteRestaurant = (id) => async (dispatch,getState) => {
    try {
        const { token } = getState().login;
        await axios.post(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/${id}`, { method : "DELETE",token : token});
        const { restaurant, currentPage} = getState().restaurant;
        let arr = restaurant.filter((item) => item._id !== id);
        if(arr.length > 0) {
            dispatch(setRest(arr));
        }
        else {
            if(currentPage !== 1){
                dispatch(setCurrentPage(currentPage-1));
                dispatch(handleChange());
            } else {
                dispatch(handleChange());
            }
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export const handleChange = ()=> async(dispatch, getState)=>{
    try {
        dispatch(setLoading(true));
        let { fetchCategory, currentPage, limit } = getState().restaurant;
        switch(fetchCategory){
            case 'getall': {
                dispatch(fetchRestaurants());
                break;
            } 
            case 'filter': {
                dispatch(fetchRestaurantsByFilter());
                break;
            }
            case 'search': {
                dispatch(fetchRestaurantsBySearch());
                break;
            }
            default: {
                const response = await axios.get(`https://restaurant-backend-bitcs.herokuapp.com/restaurant/getall?page=${currentPage}&size=${limit}`)
                dispatch(restaurantData(response.data));
            } 
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export default counterSlice.reducer