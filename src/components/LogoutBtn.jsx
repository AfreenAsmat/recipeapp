import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    onClick={logoutHandler}
    className='px-4 py-2 hover:text-blue-500'>
        Logout
    </button>
  )
}

export default LogoutBtn
