import React from 'react'
import RecipeForm from '../components/RecipeForm'
import {cuisines} from '../data/cuisinesData'

function AddRecipe() {
  return (
   <RecipeForm cuisines={cuisines}/>
  )
}

export default AddRecipe
