import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateFollowers } from '../../features/followers/followersSlice';
import { useEffect,useState } from 'react';
import { getFollowers } from '../../features/followers/followersSlice';


const AllAccounts = ({user}) => {
  const dispatch = useDispatch()
  const {followers} = useSelector((state) => state.followers)
  //const following = useSelector((state) => state.followers)
  let myFollowings = followers.followers
  let buttonClass = "follow-btn"
  myFollowings && (
    buttonClass = myFollowings.includes(user._id)?"follow-btn following":"follow-btn"
  )
  const followBtn = () =>{
    dispatch(updateFollowers(user._id))
  }

  return (
    <div>
      <div className='account'>
          {
            user.profileImg===''?<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user image" />
            :<img src={user.profileImg} alt="user image" />
          }
          <p className='fullname'>{user.fullName}</p>
          <p className='username'>@{user.userName}</p>
          <button className={buttonClass} onClick={followBtn}>
            {buttonClass==="follow-btn"?"Follow":"Following" }
          </button>
      </div>
    </div>

  )
}

export default AllAccounts