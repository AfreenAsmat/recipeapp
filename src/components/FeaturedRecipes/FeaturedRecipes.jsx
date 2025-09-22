import React, { useEffect, useState } from 'react'
import { fetchFeaturedRecipes } from '../../services/recipes'
import RecipeList from '../RecipeList/RecipeList';
import Loader from '../Loader/Loader';

function FeaturedRecipes() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
    try {
      const data = await fetchFeaturedRecipes();
      setFeatured(data.results);
    } catch (error) {
      console.log(error);      
    } finally {
      setLoading(false)
    }
  }
  loadFeatured();
  },[])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <h2 className='m-4 font-bold text-4xl text-gray-800 dark:text-gray-200'>Featured Recipes</h2>
      <RecipeList recipes={featured}/>
    </div>
  )

}
export default FeaturedRecipes
