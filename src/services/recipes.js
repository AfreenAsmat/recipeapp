const apiKey = import.meta.env.VITE_SPOONCULAR_KEY

export const fetchRecipes = async(query, number = 12, offset = 0) => {
//   const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=12&addRecipeInformation=true&apiKey=f610c5321abc4f60a88703eacebf1ff4`;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&offset=${offset}&addRecipeInformation=true&apiKey=${apiKey}`
    
    const res = await fetch(url);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch recipes: ${res.status} - ${errorText}`)
    }
    return res.json();
}
    

export async function fetchRandomRecipes(number = 12) {
    const url = `https://api.spoonacular.com/recipes/random?number=${number}&addRecipeInformation=true&apiKey=${apiKey}`

    const res = await fetch(url);
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Failed to fetch recipes: ${res.status} - ${errorText}`)
    }
    return res.json();
}

export async function fetchFeaturedRecipes() {
    const url = `https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=6&addRecipeInformation=true&apiKey=${apiKey}`;

    const res = await fetch(url);
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Failed to fetch recipes: ${res.status} - ${errorText}`)
    }

    return res.json();
}

export async function fetchRecipeDetails(id){
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;
    
    const res = await fetch(url);
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Failed to fetch recipe: ${res.status} - ${errorText}`);
    }
    return res.json();
}

export async function fetchCuisines(cuisine, number = 12, offset = 0){
    const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${number}&offset=${offset}&addRecipeInformation=true&apiKey=${apiKey}`

    const res = await fetch(url);
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Failed to fetch recipe: ${res.status} - ${errorText}`)
    }
    return res.json();
}
