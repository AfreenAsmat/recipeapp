import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createRecipe({title, ingredients, instruction, rimage, prepTime, 
        servings, cuisineId, costPerServing, diets, userId}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    ID.unique(),
                    {
                        title,
                        ingredients,
                        instruction,
                        rimage,
                        servings,
                        prepTime,
                        cuisineId,
                        costPerServing,
                        diets,
                        userId,
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: createRecipe :: error", error); 
            }
        }

        async updateRecipe(documentId, {title, ingredients, instruction, rimage, prepTime, 
        servings,costPerServing, diets, cuisineId}){
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    documentId,{
                        title,
                        ingredients,
                        instruction,
                        rimage,
                        servings,
                        prepTime,
                        costPerServing,
                        diets,
                        cuisineId,
                    }
                )
            } catch (error) {
                console.log("Appwrite service :: updateRecipe :: error", error);  
            }
        }

        async deleteRecipe(documentId){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    documentId,
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deleteRecipe :: error", error);
                return false;   
            }
        }

        async getRecipe(documentId){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    documentId,
                )
            } catch (error) {
                console.log("Appwrite service :: getRecipe :: error", error);
                return false;
            }
        }

        async getRecipes(queries = []){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    queries,
                )
            } catch (error) {
                console.log("Appwrite service :: getRecipes :: error", error);
                return false;
            }
        }

        async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Appwrite service :: uploadFile :: error", error);
                return false;
            }
        }

        async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                )
                return true;
            } catch (error) {
                console.log("Appwrite service :: deleteFile :: error", error);
                return false;
            }
        }

        getFileView(fileId){
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
        }

        async createFavorite({userId, recipeId, recipeTitle, recipeImage, servings, prepTime, costPerServing, diets ,source}){
            try {
                return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteFavoritesCollectionId,
                    ID.unique(),
                    {
                        userId,
                        recipeId: String(recipeId),
                        recipeTitle, 
                        recipeImage, 
                        servings, 
                        prepTime, 
                        costPerServing, 
                        diets,
                        source,
                    }
                );
            } catch (error) {
                console.log("Appwrite service :: createFavorite :: error", error);
                return false;
            }
        }

        async deleteFavorite(favoriteId){
            try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteFavoritesCollectionId,
                    favoriteId
                );
            } catch (error) {
                console.log("Appwrite service :: deleteFavorite :: error",error);
                return false;
            }
        }

        async getUserFavorites(userId){
            try {
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteFavoritesCollectionId,
                    [Query.equal("userId", userId)]
                );
            } catch (error) {
                console.log("Appwrite service :: getUserFavorites :: error",error);
                return false;
            }
        }

        async fetchUserRecipes(search = "", cuisine = ""){
            try {
                const queries = [];
                if (search) {
                    queries.push(Query.search("title",search),
                )
                }
                if (cuisine) {
                    queries.push(Query.equal("cuisineId", cuisine));
                }
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteRecipeCollectionId,
                    queries
                );
            } catch (error) {
                console.error("Appwrite service :: fetchUserRecipes :: error", error);
                return {documents: []};
            }
        }
}


const service = new Service()

export default service;