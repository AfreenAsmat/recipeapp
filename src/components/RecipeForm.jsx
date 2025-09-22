import React from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import appwriteService from '../appwrite/config'

const DIET_OPTIONS = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
    "Non-Vegetarian"

];

function RecipeForm({recipe, cuisines = []}) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);
    const {register, handleSubmit, watch, control, setValue, 
        formState: {errors, isSubmitting},
      } = useForm({
        defaultValues: {
            title: recipe?.title || "",
            ingredients: recipe?.ingredients?.length ? recipe.ingredients : [""],
            instruction: recipe?.instruction || "",
            servings: recipe?.servings || 1,
            prepTime: recipe?.prepTime || 10,
            costPerServing: recipe?.costPerServing || 0,
            diets: recipe?.diets || [],
            cuisineId: recipe?.cuisineId || "",
            image: null,
        }
      });

      const {fields, append, remove} = useFieldArray({
        control,
        name: "ingredients",
      });

      const onSubmit = async(data) => {
        try{
            const payload = {
                title: data.title.trim(),
                ingredients: data.ingredients
                .map((i) => i.trim()).filter(Boolean),
                instruction: data.instruction,
                servings: Number(data.servings),
                prepTime: Number(data.prepTime),
                costPerServing: Number(data.costPerServing),
                diets: Array.isArray(data.diets) ? data.diets : [],
                cuisineId: data.cuisineId || null,
                userId: user?.$id || null,
            };

            let newFileId = null;

            const fileInput = data.image?.[0];
            if (fileInput) {
                const uploaded = await appwriteService.uploadFile(fileInput);
                newFileId = uploaded?.$id || null;
                payload.rimage = newFileId;
            }

            if (recipe) {
                if (newFileId && recipe.rimage) {
                    try {
                        await appwriteService.deleteFile(recipe.rimage);
                    } catch (_) {}
                }

                const updated = await appwriteService.updateRecipe(recipe.$id, {
                    ...payload,
                    ...(newFileId ? {rimage: newFileId} : {}),
                });

                if (updated) navigate (`/recipe/${updated.$id}`);
            } else {
                const created = await appwriteService.createRecipe({
                    ...payload,
                    ...(newFileId ? {rimage: newFileId } : {}),
                });
                if (created) navigate(`/recipe/${created.$id}`);
            }
        } catch (err) {
            console.error(err);
            alert(err?.message || "Something went wrong.");   
        }
      };

      const existingImageUrl = 
      recipe?.rimage ? appwriteService.getFileView(recipe.rimage) : null;
    
  return (
    <>
    <h1 className=''>Add your favorite recipe.</h1>
        <form onSubmit={handleSubmit(onSubmit)}
        className='mx-auto max-w-5xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
            <div>
            <Input 
            label= 'Title: '
            placeholder='Title'
            {...register("title",{required: "Title is required" })}
            />
            {errors.title && (
                <p className='text-sm text-red-600 mt-1'>
                    {errors.title.message}</p>
            )}
            </div>
            <div>
                <label className='block font-medium mb-2'>Ingredients</label>
                <div className='space-y-3'>
                    {fields.map((field, index) => (
                        <div key={field.id} className='flex gap-2'>
                            <Input
                            placeholder='Ingredients'
                            className = 'flex-1'
                            {...register(`ingredients.${index}`,{
                                required: "Ingredients cannot be empty",
                            })}
                            />
                            <Button
                            type='button'
                            bgColor='bg-gray-200'
                            textColor='text-gray-800'
                            onClick={() => remove(index)}
                            className='shrink-0'>
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button
                    type='button'
                    onClick={() => append("")}
                    className='mt-2'>
                        + Add Ingredient
                    </Button>
                </div>
                {errors.ingredients && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.ingredients.message}
                        </p>
                )}
            </div>
            <div>
                <label className='block font-medium mb-2'>
                    Instructions
                    </label>
                <textarea 
                rows={8}
            placeholder = 'Instructions'
            className = 'w-full border border-gray-200 rounded-lg focus:outline-none p-3 focus:ring'
            {...register("instruction",{required: "Instructions required"})}
            />
            {errors.instruction && (
                <p className='text-sm text-red-600 mt-1'>
                    {errors.instruction.message}
                    </p>
            )}
            </div>
        </div>

        <div className='space-y-6'>
            <div>
                <label className='block font-medium mb-2'>Recipe Image</label>
                {existingImageUrl && (
                    <img src={existingImageUrl}
                     alt={recipe?.title || "Recipe Image"}
                     className='mb-3 rounded-lg shadow'
                      />
                )}
                <Input
                type='file'
                accept="image/png, image/jpeg, image/jpg, image/gif"
                className="w-full text-sm"
                {...register("image", {required: !recipe})}
                />
                {!recipe && errors.image && (
                    <p className='text-sm text-red-600 mt-1'>Image is required</p>
                )}
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Input
                    label="Servings"
                    type="number"
                    min={1}
                    {...register("servings",{
                        required: true,
                        valueAsNumber: true,
                        min: {value: 1, message: "Min 1 serving"},
                    })}
                    />
                </div>
                <div>
                    <Input 
                    label="Prep Time (mins)"
                    type="number"
                    min={1}
                    {...register("prepTime",{
                        required: true,
                        valueAsNumber: true,
                        min: {value:1, message: "Min 1 minute"},
                    })}
                    />
                </div>
                <div className='col-span-2'>
                    <Input 
                    label="Cost per Serving ($)"
                    type="number"
                    step="0.01"
                    min={0}
                    {...register("costPerServing", {
                        required: true,
                        valueAsNumber: true,
                        min: {value: 0, message:"Cannot be negative"},
                    })}
                    />
                </div>
            </div>

            <div>
                <label className='block font-medium mb-2'>Diet Types</label>
                <div className='grid grid-cols-2 gap-2'>
                    {DIET_OPTIONS.map((opt) => (
                        <label key={opt} className='flex items-center gap-2'>
                            <input 
                            type="checkbox"
                            value={opt}
                            {...register("diets")}
                            className='h-4 w-4'
                             />
                             <span className='text-sm'>{opt}</span>
                        </label>
                    ))}
                </div>
            </div>
            {Array.isArray(cuisines) && cuisines.length > 0 && (
                <div>
                    <label className='block font-medium mb-2'>Cuisine</label>
                    <select
                    className='w-full rounded-lg border border-gray-200 p-2.5'
                    {...register("cuisineId")}
                    defaultValue={recipe?.cuisineId || ""}
                    >
                        <option value="">Select a cuisine</option>
                        {cuisines.map((c) => (
                            <option value={c.$id} key={c.$id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <Button
            type='submit'
            className=''
            bgColor={recipe ? "bg-green-600" : "bg-blue-600"}>
                {isSubmitting ? (recipe ? "Updating..." : "Submitting...") : recipe ? "Update Recipe" : "Add Recipe"}
            </Button>
        </div>
        </div>
    </form>
    </>
  )
}

export default RecipeForm
