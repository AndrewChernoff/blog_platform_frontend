import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import { LoggedInUserType, LoginDataType, RegisterDataType } from './auth-types'
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk '
import { api } from '../../API/api';

interface StateType {
  user: LoggedInUserType | null
  error: string | null
}

// Define the initial state using that type
const initialState: StateType = {
  user: null,
  error: null
}

export const authSlice: Slice<StateType> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.posts.isLoading = action.payload
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      if(action.error.message) {
        state.error = action.payload.message
      }
    })
    builder.addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload
    })
    builder.addCase(logIn.rejected, (state, action) => {
      if(action.error.message) {
        //state.isLoading = false
        state.error = action.error.message
      }
    })
    builder.addCase(logOut.fulfilled, (state) => {
        state.user = null
    })
    builder.addCase(logOut.rejected, (state, action) => {
      if(action.error.message) {
        state.error = action.error.message
      }
    })
    builder.addCase(authMe.fulfilled, (state, action) => {
        state.user = action.payload
    })
    builder.addCase(authMe.rejected, (state, action) => {
      if(action.error.message) {
        //state.isLoading = false
        state.user = null
        state.error = action.error.message
      }
    })
  }
})

export const registerUser = createAppAsyncThunk<any, RegisterDataType>(
  'auth/register', async (data, {rejectWithValue}) => {

    try {
      const response = await api.register(data)
      console.log(response.data.status);
      if(response.data.status) {
        return response.data.message
      }
      
      return response.data.user
    } catch (error: any) {
      alert("Coudn't register")
      return rejectWithValue({message: "Coudn't register"})
    }
  },
)

export const logIn = createAppAsyncThunk<LoggedInUserType, LoginDataType>(
    'auth/login', async (data, { rejectWithValue }) => {

     try {
        const res = await api.login(data)
        
        if(res.status === 200) {
          
        if(res.data) {
          if('token' in res.data) {
            localStorage.setItem('blog-token', res.data.token)
          }
        }

          return res.data
        }
     } catch (error: any) {
      
      alert("Coudn't login")
      rejectWithValue(error.message)
     }    
    },
)
export const logOut = createAppAsyncThunk<void, void>(
    'auth/logout', async (_, __) => {

      const token = localStorage.getItem('blog-token')

      try {
        if(token) {
          localStorage.removeItem('blog-token')
        }
      } catch (error) {
        alert("Couldn't log out")
      }
    },
)


export const authMe = createAppAsyncThunk<Omit<LoggedInUserType, 'token'>, void>(
    'auth/authMe', async (_, { rejectWithValue }) => {
     
        const res = await api.authMe()
        console.log(res);

        if(res.status === 200) {
          return res.data.userData
        } else {
          rejectWithValue(res.statusText)
        }      
    },
)


export default authSlice.reducer