import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import Footer from './components/Footer/Footer'
import {login, logout} from './store/authSlice'

function App() {
 const dispatch = useDispatch();
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    console.log("Appwrite userData:" , userData);
    
    if (userData) {
      dispatch(login(userData));
    } else {
      dispatch(logout())
    }
  })
  .finally(() => setLoading(false))
  // .catch((err) => {
  //   console.error("Auth error: ", err);
  //    dispatch(logout())
 //});
 },[dispatch]);

  return !loading ? (
    <div>
     <NavBar />
     <Home />
     <Footer />
    </div>
  ) : (null)
}

export default App
