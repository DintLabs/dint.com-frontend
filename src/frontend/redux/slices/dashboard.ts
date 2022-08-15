import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/httpReqHook';
import IPost from '../../types/dashboard';
import { RequestMethods } from '../../types/request';

interface IDashboardState {
  posts: IPost[];
  postsLoadingStatus: string;
}

const initialState: IDashboardState = {
  posts: [],
  postsLoadingStatus: 'idle'
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { request } = useHttp();
  return request('http://18.204.217.87:8000/api/posts/list');
});

export const fetchPost = createAsyncThunk('posts/fetchPost', (post: number) => {
  const { request } = useHttp();
  return request(`http://localhost:3000/api/posts/list/${post}`);
});

export const likePost = createAsyncThunk('posts/likePost', () => {
  const { request } = useHttp();
  return request('/api/posts/like/', RequestMethods.POST);
});

export const commentPost = createAsyncThunk('posts/commentPost', () => {
  const { request } = useHttp();
  return request('/api/posts/comment/', RequestMethods.POST);
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsCreated: (state, action: PayloadAction<IPost>) => {
      state.posts.push(action.payload);
    },
    postsUpdate: (state, action: PayloadAction<IPost>) => {
      const {
        payload: { user, type, content }
      } = action;

      state.posts = state.posts.map((item) =>
        item.user === user ? { ...item, user, type, content } : item
      );
    },
    postsDeleted: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((item: IPost) => item.user !== action.payload);
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchPosts.pending, (initialState: { postsLoadingStatus: string }) => {
        initialState.postsLoadingStatus = 'loading';
      })
      .addCase(
        fetchPosts.fulfilled,
        (
          initialState: { postsLoadingStatus: string; posts: IPost },
          action: PayloadAction<IPost>
        ) => {
          initialState.postsLoadingStatus = 'idle';
          initialState.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (initialState: { postsLoadingStatus: string }) => {
        initialState.postsLoadingStatus = 'error';
      });
    // .addCase(fetchPost.pending, (initialState: { postsLoadingStatus: string }) => {
    //   initialState.postsLoadingStatus = 'loading';
    // })
    // .addCase(
    //   fetchPost.fulfilled,
    //   (
    //     initialState: { postsLoadingStatus: string; posts: IPost },
    //     action: PayloadAction<IPost>
    //   ) => {
    //     initialState.postsLoadingStatus = 'idle';
    //     initialState.posts = action.payload;
    //   }
    // )
    // .addCase(fetchPost.rejected, (initialState: { postsLoadingStatus: string }) => {
    //   initialState.postsLoadingStatus = 'error';
    // });
  }
});

export default postsSlice.reducer;
export const { postsCreated, postsUpdate, postsDeleted } = postsSlice.actions;
