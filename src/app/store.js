import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import followersReducer from '../features/followers/followersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    followers: followersReducer,
  },
})
