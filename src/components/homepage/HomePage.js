import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts } from "../../features/auth/authSlice";
import { getFollowers } from '../../features/followers/followersSlice';

import AllAccounts from "./AllAccounts";
import Profile from "./Profile";
import Following from "./Following";

const HomePage = ({setEdit}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fullName,setFullName] = useState("")
  const [userName,setUserName] = useState("")
  const [showFollowing,setShowFollowing] = useState(false)
  const {user} = useSelector((state)=>state.auth)
  const {allUsers} = useSelector((state)=>state.auth)
  const { followers, isError,message } = useSelector(
    (state) => state.followers
  )
  
  useEffect(()=>{
    if (isError) {
      console.log(message)
    }
    if(!user){
      navigate("/login")
    }else{
      dispatch(getAllAccounts())
      dispatch(getFollowers())
    }
  },[user,isError,dispatch,navigate,message])
  let followingArr = []
  let followingArrId = []

  if(followers){
    followingArrId = followers?followers.followers:[]

    followingArrId && (
      allUsers.forEach((account)=>{
        if(followingArrId.includes(account._id)){
          followingArr.push(account)
        }
      })
    )
  }
  let searchArr = allUsers.filter((acc)=>{
    if(userName===""){
      return acc
    }else if(acc.userName.toLowerCase().includes(userName.toLocaleLowerCase())){
      return acc
    }
  })
  return (
    <div className="homepage">
        <div className="homepage-profile">
          <>
            {
              user && (
                <Profile key={user._id} user={user} totalFollowing={followingArr} setShow={setShowFollowing} setEdit={setEdit}/>
              )
            }
          </>
          <div className="homepage-search">
              <input type="text" placeholder="Search by Name" onChange={(e)=> setFullName(e.target.value)}/>
              <input type="text" placeholder="Search by Social media handler" onChange={(e)=> setUserName(e.target.value)}/>
          </div>
        </div>
        
        {
          showFollowing && (
            <div>
              <p className="my-following-p">My followings</p>
              {followingArr.length===0?<p>You are not following anyone.</p>:<></>}
              <div className="following-account-div">
                {
                  followingArr && (
                    followingArr.map((user)=>(
                      <Following key={user._id} user = {user}/>
                    ))
                  )
                }
              </div>
            </div>
          )
        }

        <div className="allAccounts-div">
          <p>All Accounts</p>
          <div className="allAccounts">
            {
              searchArr.filter((acc)=>{
                if(fullName===""){
                  return acc
                }else if(acc.fullName.toLowerCase().includes(fullName.toLocaleLowerCase())){
                  return acc
                }
              })
              .map((account)=>(
                account._id !== user._id &&(
                  <AllAccounts key={account._id} user = {account}/>
                )
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default HomePage