import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import authService from '../appwrite/auth'
import {login as authLogin} from '../store/authSlice'
import Input from '../components/Input'
import Button from '../components/Button';
import { Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("");
    const [showPassword, setShowPasssword] = useState(false);

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
  
        <div className='min-h-screen flex items-center justify-center  px-4'>
            <div className='w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 dark:bg-gray-800'>
            {error && (
                <p className='text-red-600 mb-4 text-center font-medium'>{error}</p>)}
            <form onSubmit={handleSubmit(login)}
            className='flex flex-col gap-4 text-center'>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Sign In
                </span>
                <span className="text-gray-500 text-sm dark:text-gray-300">
                    Welcome back! Please login to continue.
                </span>
                <div className="bg-gray-50 rounded-lg p-2 space-y-2 dark:bg-gray-600">
                <Input 
                className='w-full border-b border-gray-200 focus:outline-none focus:ring-0 px-3 py-2 text-sm dark:bg-gray-500 dark:text-gray-200'
                type="email" 
                name='email'
                id='email'
                placeholder='E-mail'
                {...register("email",{
                    required: true,
                    validate: {
                        matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                         || "Enter a valid Email address"
                    }
                })} />
                <div className='relative'>
                <Input 
                className='w-full border-b border-gray-200 focus:outline-none focus:ring-0 px-3 py-2 text-sm pr-10 dark:bg-gray-500 dark:text-gray-200'
                type={showPassword ? "text" : "password"} 
                name='password'
                id='password'
                placeholder='Password' 
                {...register("password",{
                    required: true,
                })}/>
                <button
                type='button'
                onClick={() => setShowPasssword(!showPassword)}
                className='absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300'>
                    {showPassword ? (
                    <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       strokeWidth={1.5}
                       stroke="currentColor"
                       className="w-5 h-5"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 
                         7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 
                         7.183.07.207.07.431 0 .639C20.577 
                         16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
                       />
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                       />
                     </svg>      
          ) : (
                       <svg
                       xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       strokeWidth={1.5}
                       stroke="currentColor"
                       className="w-5 h-5"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M3.98 8.223A10.477 10.477 0 001.934 
                         12C3.226 16.338 7.244 19.5 12 
                         19.5c.993 0 1.953-.138 
                         2.863-.395M6.228 6.228A10.451 
                         10.451 0 0112 4.5c4.756 0 
                         8.773 3.162 10.065 
                         7.5a10.523 10.523 0 01-4.293 
                         5.774M6.228 6.228L3 3m3.228 
                         3.228l12.544 12.544M21 
                         21l-3-3"
                       />
                     </svg>
                    )}
                </button>
                </div>
                </div>
                <Button type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full py-2 transition-colors'>
                    Sign In
                    </Button>
            </form>
            <div className='mt-4 text-sm text-gray-600 text-center py-3 ronded-lg dark:text-gray-300'>
                <p>Dont have an account?{" "} 
                    <Link 
                    to='/signup'
                    className='text-blue-600 font-semibold hover:underline'>
                        Signup
                        </Link>
                </p>
            </div>
        </div>
        </div>
  )
}


export default Login
