import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import followersService from './followersService'

const initialState = {
  followers: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getFollowers = createAsyncThunk(
  'followers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await followersService.getFollowers(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const updateFollowers = createAsyncThunk(
  'followers/updateFollowers',
  async (accountId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await followersService.updateFollowers(accountId,token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
    followingReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFollowers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getFollowers.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.followers = action.payload
    })
    .addCase(getFollowers.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
      .addCase(updateFollowers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateFollowers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.followers = action.payload
      })
      .addCase(updateFollowers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { followingReset } = followersSlice.actions
export default followersSlice.reducer
