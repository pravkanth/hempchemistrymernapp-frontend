import axios from 'axios'

const API_URL = 'https://hempchemistrymernapp.onrender.com/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const getAccounts = async () => {

  const response = await axios.get(`${API_URL}`)

  return response.data
}

const updateAccount = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}update`,userData, config)
  return response.data
}

const deleteAccount = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + userId, config)
  return response.data
}

// Logout  
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getAccounts,
  updateAccount,
  deleteAccount,
}

export default authService
