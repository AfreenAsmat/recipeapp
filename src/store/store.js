import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import recipeSlice from './recipeSlice';
import cuisineSlice from "./cuisineSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        recipe: recipeSlice,
        cuisine: cuisineSlice,
    },
    preloadedState: JSON.parse(localStorage.getItem("reduxState")) || {},
});

store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;