import { configureStore } from "@reduxjs/toolkit";
import { authReduce } from "./slices/auth";
import { postsReduce } from "./slices/posts";
import { commentsReduce } from "./slices/comment";

const store = configureStore({
  reducer: {
    posts: postsReduce,
    auth: authReduce,
    comments: commentsReduce,
  },
});

export default store;
