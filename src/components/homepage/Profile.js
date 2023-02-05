import React from 'react'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { deleteAccount } from '../../features/auth/authSlice'
import { logout, reset } from '../../features/auth/authSlice'
import {followingReset} from '../../features/followers/followersSlice'
import './homepage.css'

const Profile = ({user,totalFollowing,setShow,setEdit}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const showFollowing = ()=>{
      setShow(prev => !prev)
  }
  totalFollowing = totalFollowing?totalFollowing.length:0

  const editAccountBtn = ()=>{
    setEdit(true)
    navigate("/register")
  }
  const deleteAccountBtn = ()=>{
    dispatch(deleteAccount(user._id))
    dispatch(logout())
    dispatch(reset())
    dispatch(followingReset())
    setShow(false)
    navigate('/login')
    window.location.reload(false)
  }
  useEffect(()=>{
    if(!user){
      dispatch(logout())
      dispatch(reset())
      dispatch(followingReset())
      navigate('/login')
    }
  },[dispatch,navigate,user])
  return (
    <div className='profile-div'>
        {
          user?
            <div className='profile'>
              <div className='profile-left'>
                  {
                    user.profileImg===''?<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" />
                    :<img src={user.profileImg} alt="user" />
                  }
                  <div className='user'>
                      <p className='name'>{user.fullName}</p>
                      <p className='username'>@{user.userName}</p>
                      <p>total Followers: {totalFollowing} </p>
                  </div>
              </div>
              <div className='profile-right'>
                  <button className='profile-followers' onClick={showFollowing}>My Followers</button>
                  <button className='profile-edit ' onClick={editAccountBtn}>Edit</button>
                  <button className='profile-delete' onClick={deleteAccountBtn}>Delete Account</button>
              </div>
            </div>:
            <div>
              LOGIN
            </div>
        }
    </div>
  )
}

export default Profile