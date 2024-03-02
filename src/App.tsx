import React from "react";

import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Header } from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/signin" element={<Registration />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
