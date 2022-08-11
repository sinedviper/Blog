import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./AddComment.module.scss";
import axios from "../../axios";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { fetchPostComments } from "../../redux/slices/comment";

export const Index = (obj) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        text: text,
        post: obj.obj.post,
      };

      await axios.post("/comment", fields);
      dispatch(fetchPostComments(obj.obj.post));
      setText("");
    } catch (err) {
      console.log(err);
      alert("Error creating article");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={obj.obj.avatar} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="contained" onClick={onSubmit}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
