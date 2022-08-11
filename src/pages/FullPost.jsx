import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPostComments } from "../redux/slices/comment";
import { fetchPost } from "../redux/slices/posts";

export const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { post } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const { auth } = useSelector((state) => state);

  const isLoadingPost = post.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  const obj = {
    post: post.items._id,
    avatar: auth.data.user.avatarUrl,
  };

  useEffect(() => {
    dispatch(fetchPost(id));
    dispatch(fetchPostComments(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingPost) {
    return <Post isLoading={isLoadingPost} isFullPost />;
  }

  return (
    <>
      <Post
        id={post.items._id}
        title={post.items.title}
        imageUrl={
          post.items.imageUrl
            ? `http://localhost:3001${post.items.imageUrl}`
            : ""
        }
        user={post.items.user}
        createdAt={post.items.createdAt}
        viewsCount={post.items.viewsCount}
        commentsCount={comments.items.length}
        tags={post.items.tags}
        isFullPost
      >
        <ReactMarkdown children={post.items.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading}>
        <Index obj={obj} />
      </CommentsBlock>
    </>
  );
};
