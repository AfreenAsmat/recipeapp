import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';


function RecipeCard({recipe, onDelete}) {
    const {toggleFavorite, isFavorite } = useContext(FavoritesContext);
    const user = useSelector((state) => state.auth.userData);

    const isSpoonacular = recipe.id !== undefined;

    const id = isSpoonacular ? recipe.id : recipe.$id;
    const title = recipe.title;
    const imageUrl = isSpoonacular
    ? recipe.image
    : recipe.rimage
    ? service.getFileView(recipe.rimage)
    : "https://via.placeholder.com/300x200?text=No+Image";

    const prepTime = recipe.readyInMinutes || recipe.prepTime || null;
    const servings = isSpoonacular ? recipe.servings : recipe.servings;
    const diets = isSpoonacular
    ? Array.isArray(recipe.diets) ? recipe.diets : []
    : Array.isArray(recipe.diets) ? recipe.diets : [];

    const costPerServing = recipe.pricePerServing
    ? (recipe.pricePerServing / 100).toFixed(2)
    : recipe.costPerServing !== undefined && recipe.costPerServing !== "N/A"
    ? recipe.costPerServing
    : null ;
    

    const isOwner = !isSpoonacular && user && recipe.userId === user.$id;
    const favorited = isFavorite(id);

  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full'>
      <img src={imageUrl}
       alt={title}
       className='w-full h-56 object-fill dark:text-gray-200 ' />
       <div className='p-4 flex  flex-col flex-1'>
      <h1 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2' >
        {title}
        </h1>
      <div className='flex flex-wrap gap-2 mb-4'>
        {prepTime && prepTime !== "N/A" && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium'>
        ⏱ {prepTime} mins
        </span>
      )}
      {diets.length > 0 && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium'>
        🥗 {diets.join(", ")}
        </span>)}
        {servings && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium'>
        🍴 Serves: {servings}
        </span>)}
        {costPerServing !== null && (
      <span className='px-3 py-1 bg-gray-100 dark:bg-gray-600 dark:text-gray-100 rounded-full text-sm font-medium'>
        💲{costPerServing}$ per serving
        </span>)}
      
      </div>

      <div className='flex items-center justify-between  mt-auto '>
      <Link to={`/recipe/${id}`} className='flex-1 mr-3'>
      <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition'>
        View Recipe
      </button>
      </Link>
      {isOwner ? (
        <div>
        <Link to={`/edit-recipe/${id}`}>
      <button
      className='p-2 rounded-full bg-gray-100 dark:bg-gray-700'
      title='Edit Recipe'>
        <FaEdit className='text-xl dark:text-gray-400'/>
      </button>
      </Link>
      <button
      onClick={() => onDelete(recipe.$id)}
      className='p-2 rounded-full bg-gray-100 dark:bg-gray-700'
      title='Delete Recipe'>
        <FaTrash className='text-xl dark:text-gray-400'/>
      </button>
      </div>
       ) : (
        <button onClick={() => toggleFavorite(recipe, user.$id, isSpoonacular)}
        className='p-2 rounded-full bg-gray-100 dark:bg-gray-700'
        title={favorited ? "Remove from favorites" : "Add to favorites"}>
          {favorited ? (
            <FaHeart className='text-red-500 text-xl'/>
          ) : (
            <FaRegHeart className='text-gray-500 text-xl' />
          )}
        </button>
      )}
      </div>
    </div>
    </div>
  )
}

export default RecipeCard
