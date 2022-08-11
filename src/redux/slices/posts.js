import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPostsPopular = createAsyncThunk(
  "posts/fetchPostsPopular",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);

export const fetchPostsTag = createAsyncThunk(
  "posts/fetchPostsTag",
  async (tag) => {
    const { data } = await axios.get(`/posts/tag/${tag}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
    const { data } = await axios.get("/posts");
    return data;
  }
);

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  post: {
    items: {},
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  popular: {
    items: [],
    status: "loading",
  },
  PostOfTag: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    //posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //post
    [fetchPost.pending]: (state) => {
      state.post.items = {};
      state.post.status = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post.items = action.payload;
      state.post.status = "loaded";
    },
    [fetchPost.rejected]: (state) => {
      state.post.items = {};
      state.post.status = "error";
    },
    //tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    //remove post
    [fetchRemovePost.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //popular 5 posts
    [fetchPostsPopular.pending]: (state) => {
      state.popular.items = [];
      state.popular.status = "loading";
    },
    [fetchPostsPopular.fulfilled]: (state, action) => {
      state.popular.items = action.payload;
      state.popular.status = "loaded";
    },
    [fetchPostsPopular.rejected]: (state) => {
      state.popular.items = [];
      state.popular.status = "error";
    },
    //tag
    [fetchPostsTag.pending]: (state) => {
      state.PostOfTag.items = [];
      state.PostOfTag.status = "loading";
    },
    [fetchPostsTag.fulfilled]: (state, action) => {
      state.PostOfTag.items = action.payload;
      state.PostOfTag.status = "loaded";
    },
    [fetchPostsTag.rejected]: (state) => {
      state.PostOfTag.items = [];
      state.PostOfTag.status = "error";
    },
  },
});

export const postsReduce = postsSlice.reducer;
