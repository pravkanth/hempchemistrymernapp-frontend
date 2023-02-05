import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

import { logout, register, reset, updateAccount } from '../../features/auth/authSlice'

import './form.css'

const Form = ({edit,setEdit}) => {
  let initialState = { firstName: '',lastName: '', userName:"", imgUrl:"" ,email: '', password: ''};
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userAcc = useSelector((state)=> state.auth)
  const [user,setUser] = useState({})
  const [showPassword,setShowPassword] = useState("password")
  console.log(user);
  const { userAccount, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (edit===false && isSuccess || userAccount) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])


  useEffect(()=>{
      let userDetails = userAcc.user
      if(userDetails){
        let userName = userDetails.fullName.split(" ")
        let userObj = {
          firstName:userName[0],
          lastName:userName[1],
          userName:userDetails.userName,
          imgUrl:userDetails.profileImg,
          email:userDetails.email,
          password:""
        }
        setUser(userObj)
      }else{
        setUser(initialState)
      }
  },[])

  const showPasswordBtn = (e)=>{
    //alert("clicked")
    e.preventDefault()
    showPassword==="password"?setShowPassword("text"):setShowPassword("password")
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({...user,imgUrl:base64})
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    const userData = {
      fullName:user.firstName+" "+user.lastName,
      userName:user.userName,
      profileImg:user.imgUrl,
      email:user.email,
      password:user.password
    }
    console.log(userData);
    setEdit(false)
    if(userAcc.user){
      dispatch(updateAccount(userData))
      dispatch(logout())
      dispatch(reset())
      navigate("/login")
        window.location.reload(true)
    }else{
      dispatch(register(userData))
      navigate("/")
    }
    initialState = { firstName: '',lastName: '', userName:"", imgUrl:"" ,email: '', password: ''};
  }
  const handleChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  return (
    <div className='auth'>
      <form onSubmit={handleSubmit} className='signup-form'>
        <h2>Signed up</h2>
        <div className='profile-img-div'>
          <label htmlFor='profile-img'>
            {
                user.imgUrl?
                    <img src={user.imgUrl} alt="uploadedimage" className='uploaded-profile-img'/>
                    :
                    <img src="https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ=" alt="profile" />
            }
          </label>
          <p>Profile image</p>
          <input type="file" name='imgUrl' placeholder='img' id='profile-img' onChange={(e)=> handleFileUpload(e)} className="image-input" alt='user-img'/>
        </div>
        <div className='signup-username'>
          <input type="text" name='firstName' value={user.firstName} placeholder='First Name' onChange={handleChange} className="signup-input-field"/>
          <input type="text" name='lastName' value={user.lastName} placeholder='Last Name' onChange={handleChange} className="signup-input-field"/>
        </div>
       {
        !userAcc.user && (
          <>
             <input type="text" name='userName' value={user.userName} placeholder='User Name' onChange={handleChange} className="input-field"/>
          <input type="email" name='email' value={user.email} placeholder='email' onChange={handleChange} className="input-field"/>
          </>
        )
       }
        <div className='password-input input-field'>
            <input type={showPassword} name='password' placeholder='password' onChange={handleChange} className="login-password"/>
            <button onClick={showPasswordBtn}>
              {
                showPassword==="password"?"show":"hide"
              }
            </button>
        </div>
        <input type="submit" name='signup' value="submit" className='signup-submit'/>
        <p className='signup-user'>Having an account?
          <Link to='/login'>
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Form

