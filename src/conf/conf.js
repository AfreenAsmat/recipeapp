const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCuisineCollectionId: String(import.meta.env.VITE_APPWRITE_CUISINE_COLLECTION_ID),
    appwriteRecipeCollectionId: String(import.meta.env.VITE_APPWRITE_RECIPE_COLLECTION_ID),
    appwriteFavoritesCollectionId: String(import.meta.env.VITE_APPWRITE_FAVORITES_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteRecoveryUrl: "http://localhost:5173/reset-password",
}
console.log("conf:", conf);

export default conf;