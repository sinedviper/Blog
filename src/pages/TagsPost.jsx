import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { fetchPostsTag } from "../redux/slices/posts";
import Typography from "@mui/material/Typography";

export const TagsPost = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const { PostOfTag } = useSelector((state) => state.posts);
  const isPostsTagLoading = tag.status === "loading";

  useEffect(() => {
    dispatch(fetchPostsTag(tag));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Grid container spacing={1}>
        <Typography variant="h4" gutterBottom component="div" item>
          #{tag}
        </Typography>
        <Grid xs={12} item>
          {(isPostsTagLoading ? [...Array(0)] : PostOfTag.items).map(
            (obj, index) =>
              isPostsTagLoading ? (
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
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?.user?._id === obj.user._id}
                />
              )
          )}
        </Grid>
      </Grid>
    </>
  );
};
