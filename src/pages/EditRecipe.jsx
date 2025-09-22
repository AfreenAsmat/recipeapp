import React, { useEffect, useState } from 'react'
import RecipeForm from '../components/RecipeForm'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader/Loader';
import appwriteService from '../appwrite/config';

function EditRecipe() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        appwriteService.getRecipe(id).then(setRecipe).catch(console.error);
    },[id])

    if (!recipe) return <div><Loader /></div>
  return (
    <div>
      <RecipeForm recipe={recipe}/>
    </div>
  )
}

export default EditRecipe
