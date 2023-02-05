import axios from 'axios'

const API_URL = 'https://hempchemistrymernapp.onrender.com/api/followers'

const getFollowers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${API_URL}/me`, config)
  console.log(response.data.userFollowers[0]);
  return response.data.userFollowers[0]
}

const updateFollowers = async (accountId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/${accountId}`, config)
  console.log(response.data);
  return response.data
}


const followersService = {
  getFollowers,
  updateFollowers,
}

export default followersService
