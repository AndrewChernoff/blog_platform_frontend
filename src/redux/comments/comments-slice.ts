import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import { api } from '../../API/api'
import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk '
import { CommentType } from './comments-types'

interface StateType {
    isLoading: boolean
    items: CommentType[]
    error: null | string
}

// Define the initial state using that type
const initialState: StateType = {
    isLoading: false,
    items: [],
    error: null
}

export const commentsSlice: Slice<StateType> = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
   extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false
        state.items = action.payload
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      if(action.error.message) {
        state.isLoading = false
        state.error = action.error.message
      }
    })

    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.items.push(action.payload)
    })
    builder.addCase(createComment.rejected, (state, action) => {
      if(action.error.message) {
        state.isLoading = false
        state.error = action.error.message
      }
    })

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.items = state.items.filter(el => el._id !== action.payload.id)
    })
    builder.addCase(deleteComment.rejected, (state, action) => {
      if(action.error.message) {
        state.isLoading = false
        state.error = action.error.message
      }
    })
  }
})

export const fetchComments = createAppAsyncThunk<CommentType[],  string>(
    'posts/fetchComments', async (id, {rejectWithValue}) => {
     
        const res = await api.getComments(id)

        if(res.status === 200) {
          return res.data
        } else {
          rejectWithValue(res.statusText)
        }      
    },
)

export const createComment = createAppAsyncThunk<CommentType, {id: string, text: string}>(
    'posts/createComment', async ({id, text}, {rejectWithValue}) => {
     
        const res = await api.createComment(id, text)

        if(res.status === 200) {
          return res.data
        } else {
          rejectWithValue(res.statusText)
        }      
    },
)

export const deleteComment = createAppAsyncThunk<{id: string, postId: string}, {id: string, postId: string, userId: string}>(
    'posts/deletComment', async ({id, postId, userId}, {rejectWithValue}) => {
     
      try {
        const res = await api.deleteComment(id, postId, userId);
  
        if (res.status === 200) {
          return { id, postId };
        } else {
          return rejectWithValue(res.statusText);
        }
      } catch (error) {
        return rejectWithValue(error);
      }      
    },
)

export default commentsSlice.reducer