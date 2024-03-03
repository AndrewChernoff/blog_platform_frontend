import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk ';
import { api } from '../../API/api';

type UserType = {
  _id: string
  avatarUrl?: string;
  fullName: string
  email: string
  passwordHash: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type PostItemType = 
{
  _id: string
  title: string
  text: string
  imageUrl?: string
  tags: Array<string>
  viewsCount: number
  user: UserType
  createdAt: string
  updatedAt: string
  __v: number
}

interface StateType {
  posts: {
    isLoading: boolean
    items: PostItemType[]
  },
  tags: {
    isLoading: boolean
    items: any[]
  }

}

// Define the initial state using that type
const initialState: StateType = {
  posts: {
    isLoading: false,
    items: []
  },
  tags: {
    isLoading: false,
    items: []
  }
}

export const postsSlice = createSlice({
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
    'posts/fetchPosts', async () => {
      const res = await api.getPosts()
      return res
    },
)
export const fetchTags = createAppAsyncThunk<string[], void>(
    'posts/tags', async () => {
      const res = await api.getTags()
      return res
    },
)

export default postsSlice.reducer