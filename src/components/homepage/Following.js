import React from 'react'

const Following = ({user}) => {
  return (
    <div className='following-account'>
         {
            user.profileImg===''?<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="user" />
            :<img src={user.profileImg} alt="user" />
          }
        <p className='fullname'>{user.fullName}</p>
        <p className='username'>@{user.userName}</p>
    </div>
  )
}

export default Following