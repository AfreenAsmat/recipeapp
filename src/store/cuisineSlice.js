import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuisineType: "all",
};

const cuisineSlice = createSlice({
    name: "cuisine",
    initialState,
    reducers: {
        setCuisine: (state, action) => {
            state.cuisineType = action.payload;
        }
    }
});

export const {setCuisine} = cuisineSlice.actions;

export default cuisineSlice.reducer;