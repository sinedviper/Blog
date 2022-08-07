import express from "express";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin:889668@blog.oqygvwu.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(3001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK, http://localhost:3001/");
});
