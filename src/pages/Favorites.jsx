import React, { useContext, useEffect, useState } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext'
import RecipeList from '../components/RecipeList/RecipeList';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';
import Loader from '../components/Loader/Loader';


function Favorites() {
    const {favorites} = useContext(FavoritesContext);
    const user = useSelector((state) => state.auth.userData);
    const [favRecipes, setFavRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadFavorites = async () => {
        if (!user || favorites.length === 0) {
          setFavRecipes([]);
          setLoading(false);
          return;
        }
        try {
          const recipePromises = favorites.map(async (fav) => {
            if (fav.source === "appwrite") {
              const recipe = await service.getRecipe(fav.recipeId);
              return recipe ? {...recipe, favoriteId: fav.$id } : null;
          } else {
            return {
              id: fav.recipeId,
              title: fav.recipeTitle,
              image: fav.recipeImage,
              servings: fav.servings,
              costPerServing: fav.costPerServing && fav.costPerServing !== "N/A"
              ? parseFloat(fav.costPerServing)
              : null,
              diets: fav.diets,
              prepTime: fav.prepTime || "N/A",
              favoriteId: fav.$id,
            };
          }
        });
        const fullRecipes = await Promise.all(recipePromises);

        setFavRecipes(fullRecipes.filter((r) => r));
        } catch (err) {
          console.error("Error loading favorite recipes", err);
        }
        finally{
          setLoading(false);
        }
      }
      loadFavorites();
    },[user, favorites]);

   

    if (!user) {
      return (
        <div className='dark:bg-gray-900 text-center py-20'>
          <h2 className='text-xl font-semibold dark:text-gray-100'>
            Please {""}
            <Link to={'/login'} className='text-blue-600 font-semibold hover:underline'>
            Login
            </Link>
            {" "}to view your favorite recipes.
          </h2>
        </div>
      )
    }

     if (loading){
      return <Loader />
    }
  
  return (
    <div className='dark:bg-gray-900 px-4'>
      {favRecipes.length === 0 ? (
        <p className='dark:text-gray-100 py-10'>No favorites yet.</p>
      ) : (
        <div>
        <h1 className='text-2xl font-bold px-3 py-2 mb-4 dark:text-gray-100'>My Favorites</h1>
                <RecipeList recipes={favRecipes}/>
                </div>
      )}
    </div>
  )
}

export default Favorites

