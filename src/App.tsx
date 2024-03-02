import React from "react";

import Container from "@mui/material/Container";

import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/*<FullPost />*/}
        {/*<AddPost />*/}
        {/*<Login />*/}
        {/*<Registration />*/}
      </Container>
    </>
  );
}

export default App;
