import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { login, reset } from '../../features/auth/authSlice'
import { getAllAccounts } from "../../features/auth/authSlice";

import { Link } from 'react-router-dom'

import './form.css'

const initialState = {email: '', password: ''};

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const [user,setUser] = useState(initialState)
    const [showPassword,setShowPassword] = useState("password")
    const users = useSelector((state)=>state.users)

    const { userAccount, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        if (isSuccess || userAccount) {
          console.log(users);
          navigate('/')
        }
    
        dispatch(reset())
      }, [userAccount, isError, isSuccess, message, navigate, dispatch])
    

    const showPasswordBtn = (e)=>{
      //alert("clicked")
      e.preventDefault()
      showPassword==="password"?setShowPassword("text"):setShowPassword("password")
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(user);
        dispatch(login(user))
        dispatch(getAllAccounts())
    }
    const handleChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }  
  return (
    <div className='auth'>
    <form onSubmit={handleSubmit} className="login">
        <h2>Login</h2>
        <p>Good to see you again</p>
        <input type="email" name='email' placeholder='Email' onChange={handleChange} className="login-email input-field"/>
        <div className='password-input input-field'>
            <input type={showPassword} name='password' placeholder='Password' onChange={handleChange} className="login-password"/>
            <button onClick={showPasswordBtn}>
                {
                showPassword==="password"?"show":"hide"
                }
            </button>
        </div>
        <input type="submit" name='signin' value="Sign in" className='login-submit'/>
        <p className='new-user'>New user? 
            <Link to="/register">
                <span>Sign up</span>
            </Link>
        </p>
    </form>

    </div>
  )
}

export default Login