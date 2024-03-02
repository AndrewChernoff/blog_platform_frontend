import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk ';
import { api } from '../../API/api';

// Define a type for the slice state
export type PostItemType = 
{
  title: string,
  text: string,
  tags: Array<string>,
  viewsCount: number,
  user: {
    [key:string]:string;
  },
  createdAt: string,
  updatedAt: string,
  __v: number
}

interface StateType {
  posts: {
    loading: boolean
    items: PostItemType[] | null
  },
  tags: {
    loading: boolean
    items: any[] | null
  }

}

// Define the initial state using that type
const initialState: StateType = {
  posts: {
    loading: false,
    items: null
  },
  tags: {
    loading: false,
    items: null
  }
}

export const postsSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    /* getPosts: (state, action: PayloadAction<PostItemType[]>) => {
      state.posts.items = action.payload
    }, */
    /* getTags: (state, action: PayloadAction<any[]>) => {
      state.tags.items = action.payload
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload
    })
  },
})

//export const {  } = postsSlice.actions


export const fetchPosts = createAppAsyncThunk<PostItemType[]/* any */, void>(
    'posts/fetchPosts', async () => {
      const res = await api.getPosts()
      // Inferred return type: Promise<MyData>
      return res
    },
  )

 /*  const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (): Promise<PostItemType> => {
      const res = await api.getPosts();
      return res.data; // Assuming api.getPosts() returns an AxiosResponse object
    }
  ); */

export default postsSlice.reducer