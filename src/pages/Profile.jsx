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
    <div className='max-w-4xl mx-auto p-6'>
    <div className='flex items-center gap-4 mb-6'>
    <div className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold'>
      {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
    </div>
    <div>
        <h2 className='text-xl font-semibold dark:text-gray-100'>{user?.name}</h2>
        <p className='text-gray-500 dark:text-gray-400'>{user?.email}</p>
    </div>
    </div>

    <div className='mb-6'>
    <Link to='/add-recipe'>
    <button className='px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700'>
        + Add Recipe
    </button>
    </Link>
    </div>

    <div>
        <h3 className='text-lg font-semibold mb-4 dark:text-gray-200'>
            My Recipes</h3>
            {loading ? (
                <Loader />
            ) : userRecipes.length === 0 ? (
                    <p className='text-gray-500 dark:text-gray-500'>
                You haven't added any recipes yet.
                </p>
                ) : (
                     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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