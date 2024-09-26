import { createSlice } from '@reduxjs/toolkit'


const initialState = {
 
  token: null,

  userData: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails(state, { payload }) {
      state.token = payload.token
      state.userData = payload.userData
    },
  }
})

export const {
  setUserDetails,

  
} = authSlice.actions

export default authSlice.reducer