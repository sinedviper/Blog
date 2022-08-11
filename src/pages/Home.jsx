import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {
  fetchPosts,
  fetchPostsPopular,
  fetchTags,
} from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/comment";

export const Home = () => {
  const [block, setBlock] = useState(0);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, popular } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isPopularLoading = popular.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  const commentsView = (id) => {
    return comments.items
      .map((obj) => {
        return obj.post._id === id ? obj : undefined;
      })
      .filter((obj) => obj !== undefined).length;
  };

  const comment = comments.items
    .slice(comments.items.length - 5, comments.items.length)
    .reverse();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchPostsPopular());
    dispatch(fetchComments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={block}
        aria-label="basic tabs example"
      >
        <Tab
          label="Новые"
          onClick={() => {
            setBlock(0);
          }}
        />
        <Tab
          label="Популярные"
          onClick={() => {
            setBlock(1);
          }}
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {block === 1
            ? (isPopularLoading ? [...Array(1)] : popular.items).map(
                (obj, index) =>
                  isPopularLoading ? (
                    <Post key={index} isLoading={true} />
                  ) : (
                    <Post
                      id={obj._id}
                      key={obj._id}
                      title={obj.title}
                      imageUrl={
                        obj.imageUrl
                          ? `http://localhost:3001${obj.imageUrl}`
                          : ""
                      }
                      user={obj.user}
                      createdAt={obj.createdAt}
                      viewsCount={obj.viewsCount}
                      commentsCount={commentsView(obj._id)}
                      tags={obj.tags}
                      isEditable={userData?.user?._id === obj.user._id}
                    />
                  )
              )
            : (isPostsLoading ? [...Array(0)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={obj._id}
                    key={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `http://localhost:3001${obj.imageUrl}` : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={commentsView(obj._id)}
                    tags={obj.tags}
                    isEditable={userData?.user?._id === obj.user._id}
                  />
                )
              )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comment} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
