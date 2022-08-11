import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { Header } from "./components";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  TagsPost,
} from "./pages";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/tag/:tag" element={<TagsPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
