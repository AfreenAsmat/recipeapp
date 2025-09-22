import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import { fetchRecipes } from './services/recipes.js'
import Recipes from './pages/Recipes.jsx'
import RecipeDetail from './pages/RecipeDetail.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext.jsx'
import Favorites from './pages/Favorites.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { SearchProvider } from './contexts/SearchContext.jsx'
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Signup from './pages/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AddRecipe from './pages/AddRecipe.jsx'
import Profile from './pages/Profile.jsx'
import EditRecipe from './pages/EditRecipe.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='recipes' element={<Recipes /> }/>
      <Route path='/recipe/:id' element={<RecipeDetail />}/>
      <Route path='recipes/cuisine/:cuisine' element={<Recipes />}/>
      <Route path='/favorites' element={<Favorites />}/>
      <Route path='/add-recipe' element={<AddRecipe />}/>
      <Route path='/edit-recipe/:id' element={<EditRecipe />}/>
      <Route path='/profile' element={<Profile />}/>
    </Route>
    <Route element={<AuthLayout />}>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<Signup/>}/>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <SearchProvider>
    <ThemeProvider>
    <FavoritesProvider>
    <RouterProvider router={router} />
    </FavoritesProvider>
    </ThemeProvider>
    </SearchProvider>
    </Provider>
  </StrictMode>,
)
