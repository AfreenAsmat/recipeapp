import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';
import service from '../appwrite/config';
import Loader from '../components/Loader/Loader';

function Profile() {
    const user = useSelector((state) => state.auth.userData);
    const [userRecipes, setUserRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchUserRecipes = async() => {
            try {
                const response = await service.getRecipes([
                Query.equal("userId", user.$id)
                ]);
                if (response && response.documents){
                setUserRecipes(response.documents);
                }
            } catch (error) {
                console.error("Error fetching user recipes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserRecipes();
    },[user]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await service.deleteRecipe(id);
                setUserRecipes((prev) => prev.filter((r) => r.$id !== id));
                alert("Recipe deleted successfully!");
            } catch (err) {
                console.error("Delete failed", err);
                alert("Failed to delete recipe.");
            }
        }
    };

   
  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8'>
    <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl sm:text-2xl font-bold shrink-0'>
      {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
    </div>
    <div className='text-center sm:text-left'>
        <h2 className='text-lg sm:text-xl font-semibold dark:text-gray-100'>{user?.name}</h2>
        <p className='text-sm sm:text-base text-gray-500 dark:text-gray-400 break-all'>{user?.email}</p>
    </div>
    </div>

    <div className='mb-6 text-center'>
    <Link to='/add-recipe'>
    <button className='px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 text-sm sm:text-base'>
        + Add Recipe
    </button>
    </Link>
    </div>

    <div>
        <h3 className='text-base sm:text-lg font-semibold mb-4 dark:text-gray-200'>
            My Recipes</h3>
            {loading ? (
                <Loader />
            ) : userRecipes.length === 0 ? (
                    <p className='text-gray-500 dark:text-gray-500 text-sm sm:text-base'>
                You haven't added any recipes yet.
                </p>
                ) : (
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {userRecipes.map((recipe) => (
                    <RecipeCard 
                    key={recipe.$id} 
                    recipe={recipe}
                    onDelete = {handleDelete}/>
                ))}
            </div>
                )}
    </div>
    
    </div>
  )
}

export default Profile