import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate,Link } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import './nav.css'

const Nav = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const users = useSelector((state)=>state.auth)

    const [signedIn,setSignedIn] = useState(user?true:false)
   const handleSignup = ()=>{
        console.log('clicked');
   }
   const handleSignout = ()=>{
    dispatch(logout())
    dispatch(reset())
    setSignedIn(false)
    navigate('/login')
  }
  useEffect(()=>{
    if(signedIn || users.user){
        setSignedIn(true)
    }else{
        setSignedIn(false)
    }
  },[signedIn,users,dispatch])
  let profileImage = users.user?users.user.profileImg:"" 
  return (
    <div className='nav'>
        <div className='nav-title-search'>
            <Link to="/">
                <h3>Hemp Chemistry</h3>
            </Link>
        </div>
        <div className='nav-items'>
            {
                signedIn && (
                    <div className='signed-in'>
                        <p>{users.user?users.user.fullName:""}</p>
                        {
                            profileImage===''?<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" />
                            : <img src={profileImage} alt="user" />
                        }
                    </div>
                )
            }
            {
                <Link to="/login">
                    {
                        signedIn?
                        <button className='signin-btn' onClick={handleSignout}>Logout</button>:
                        <button className='signin-btn' onClick={handleSignup}>Signed In</button>
                    }
                </Link>
            }
        </div>
    </div>
  )
}

export default Nav