import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer, 
})

const store = configureStore({
    reducer: rootReducer
});

export default store;