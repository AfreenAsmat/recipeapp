import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
    favorites: [],
    loading: false,
    error: null
};

const recipeSlice = createSlice({
    name:"recipe",
    initialState,
    reducers: {
        setRecipes:(state, action) => {
            state.recipes = action.payload;
        },
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                (recipe) => recipe.id !== action.payload
            );
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});


export const {
    setRecipes, 
    addFavorite, 
    removeFavorite, 
    setLoading, 
    setError
} = recipeSlice.actions;

export default recipeSlice.reducer;