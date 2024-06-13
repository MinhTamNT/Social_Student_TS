import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  allPosts: {
    posts: any[];
    comments: any[];
    reactPost: any[];
    pending: boolean;
    error: boolean;
  };
  onePost: {
    post: any[];
    comments: any[];
    pending: boolean;
    error: boolean;
  };
  deletePost: {
    pending: boolean;
    error: boolean;
  };
  createPost: {
    pending: boolean;
    error: boolean;
  };
  reactPost: {
    currentReact: string | null;
    pending: boolean;
    error: boolean;
  };
}
const initialState: PostState = {
  allPosts: {
    posts: [],
    comments: [],
    reactPost: [],
    pending: false,
    error: false,
  },
  onePost: {
    post: [],
    comments: [],
    pending: false,
    error: false,
  },
  deletePost: {
    pending: false,
    error: false,
  },
  createPost: {
    pending: false,
    error: false,
  },
  reactPost: {
    currentReact: null,
    pending: false,
    error: false,
  },
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPostStart: (state) => {
      state.allPosts.pending = true;
    },
    getAllPostSuccess: (state, action: PayloadAction<any[]>) => {
      state.allPosts.pending = false;
      const existingIds = new Set(state.allPosts.posts.map((post) => post.id));
      state.allPosts.posts = [
        ...state.allPosts.posts,
        ...action.payload.filter((post) => !existingIds.has(post.id)),
      ];
    },
    getOnePostStart: (state) => {
      state.onePost.pending = true;
    },
    getOnePostSuccess: (state, action) => {
      state.onePost.post = action.payload;
    },
    getOnePostFailed: (state) => {
      state.onePost.error = true;
    },
    CommentPostStart: (state) => {
      state.onePost.pending = true;
    },
    CommentPostSuccess: (state, action) => {
      state.onePost.pending = false;
      state.onePost.comments = action.payload;
    },
    CommentPostFail: (state) => {
      state.onePost.pending = false;
      state.onePost.error = true;
    },
    createPostStart: (state) => {
      state.createPost.pending = true;
      state.createPost.error = false;
    },
    createPostSuccess: (state) => {
      state.createPost.pending = false;
      state.createPost.error = false;
    },
    createPostFailed: (state) => {
      state.createPost.pending = false;
      state.createPost.error = true;
    },
    deletePostStart: (state) => {
      state.deletePost.pending = true;
    },
    deletePostSuccess: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = false;
    },
    deletePostFailed: (state) => {
      state.deletePost.error = true;
      state.deletePost.pending = false;
    },
    reactPostStart: (state) => {
      state.reactPost.pending = true;
      state.reactPost.error = false;
    },
    reactPostSuccess: (state, action: PayloadAction<string>) => {
      state.reactPost.currentReact = action.payload;
      state.reactPost.pending = false;
      state.reactPost.error = false;
    },
    reactPostFailed: (state) => {
      state.reactPost.pending = false;
      state.reactPost.error = true;
    },
    deleteReactionPostStart: (state) => {
      state.deletePost.pending = true;
    },
    deleteReactionPostSuccess: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = false;
    },
    deleteReactionPostFailed: (state) => {
      state.deletePost.error = true;
      state.deletePost.pending = false;
    },
  },
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  getOnePostStart,
  getOnePostSuccess,
  getOnePostFailed,
  deletePostStart,
  deletePostFailed,
  deletePostSuccess,
  reactPostStart,
  reactPostFailed,
  reactPostSuccess,
  deleteReactionPostStart,
  deleteReactionPostFailed,
  deleteReactionPostSuccess,
  CommentPostFail,
  CommentPostStart,
  CommentPostSuccess,
} = postSlice.actions;
export default postSlice.reducer;
