import { configureStore } from '@reduxjs/toolkit';

import allReducer from './rest'
import loginReducer from './login'
import singleReducer from './SingleRestro'
import usersReducer from './users'
export const store = configureStore({
  reducer : {
    restaurant : allReducer,
    login : loginReducer,
    singleRestaurant : singleReducer,
    users : usersReducer
  },
});