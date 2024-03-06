import React, { useEffect } from "react";

import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Header } from "./components/Header";
import { useAppDispatch } from "./hooks/redux-hooks";
import { authMe } from "./redux/auth/auth-slice";

function App() {

const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(authMe())
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
