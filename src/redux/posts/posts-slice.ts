import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk ';
import { api } from '../../API/api';
import { PostItemType } from './posts-types';
import { AxiosError } from 'axios';

interface StateType {
  posts: {
    isLoading: boolean
    items: PostItemType[]
    error: null | string
  },
  tags: {
    isLoading: boolean
    items: string[]
  }

}

// Define the initial state using that type
const initialState: StateType = {
  posts: {
    isLoading: false,
    items: [],
    error: null
  },
  tags: {
    isLoading: false,
    items: []
  }
}

export const postsSlice: Slice<StateType> = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.posts.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
        state.posts.isLoading = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.isLoading = false
        state.posts.items = action.payload
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      if(action.error.message) {
        state.posts.isLoading = false
        state.posts.error = action.error.message
      }
    })
     builder.addCase(fetchTags.pending, (state) => {
        state.tags.isLoading = true
    })
     builder.addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.isLoading = false
        state.tags.items = action.payload
    })
  }
})

export const fetchPosts = createAppAsyncThunk<PostItemType[], void>(
    'posts/fetchPosts', async (_, {rejectWithValue}) => {
     
        const res = await api.getPosts()

        if(res.status === 200) {
          return res.data
        } else {
          rejectWithValue(res.statusText)
        }      
    },
)
export const fetchTags = createAppAsyncThunk<string[], void>(
    'posts/tags', async () => {
      const res = await api.getTags()
      return res
    },
)

export default postsSlice.reducer