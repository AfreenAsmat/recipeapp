import { createContext, useContext, useEffect, useState } from "react";
import service from "../appwrite/config";
import { useSelector } from "react-redux";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        const loadFavorites = async () => {
            if (user) {
                try {
                    const res = await service.getUserFavorites(user.$id);
                    // console.log("Fetched favorites:", res.documents);
                    setFavorites(res?.documents || []);
                } catch (error) {
                    console.error("Failed to load favorites:", error);  
                }
            } else {
                setFavorites([]);
            }
        };
        loadFavorites();
    },[user]);
    
    const toggleFavorite = async (recipe, userId, isSpoonacular = false) => {
        if (!user) return ;
        const recipeId = String(isSpoonacular ? recipe.id : recipe.$id);
        try {
            const existing = favorites.find(
                (fav) =>
                    fav.recipeId === recipeId && fav.userId === userId
            );

            if (existing){
                await service.deleteFavorite(existing.$id);
                setFavorites((prev) => prev.filter((f) => f.$id !== existing.$id));
                return;
            }

            const prepTime = isSpoonacular
            ? recipe.readyInMinutes
            : recipe.prepTime;
            const costPerServing = isSpoonacular
               ? recipe.pricePerServing
                ? (recipe.pricePerServing / 100).toFixed(2)
                : null
               : recipe.costPerServing ;

            const newFav = await service.createFavorite({
                userId: user.$id,
                recipeId,
                recipeTitle: recipe.title,
                recipeImage: recipe.image,
                servings: recipe.servings || 0,
                prepTime: prepTime !== null ? Math.floor(prepTime) : 0,
                costPerServing: costPerServing !== null
                ? String(costPerServing)
                : "N/A",
                diets: recipe.diets || [],
                source: isSpoonacular ? "api" : "appwrite",

            });
            if (newFav) {
            setFavorites((prev) => [...prev, newFav]);
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
        }
        };
    

    const isFavorite = (recipeId) => {
        return favorites.some((f) => f.recipeId === String(recipeId));
    };

    return(
        <FavoritesContext.Provider
        value={{favorites, toggleFavorite , isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    );
};
