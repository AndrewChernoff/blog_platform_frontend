import { useEffect, lazy, Suspense  } from "react";

import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Header } from "./components/Header";
import { useAppDispatch } from "./hooks/redux-hooks";
import { authMe } from "./redux/auth/auth-slice";

const Home = lazy(() =>
  import("./pages").then(({ Home }) => ({ default: Home }))
);
const FullPost = lazy(() =>
  import("./pages").then(({ FullPost }) => ({ default: FullPost }))
);
const Registration = lazy(() =>
  import("./pages").then(({ Registration }) => ({ default: Registration }))
);
const AddPost = lazy(() =>
  import("./pages").then(({ AddPost }) => ({ default: AddPost }))
);
const Login = lazy(() =>
  import("./pages").then(({ Login }) => ({ default: Login }))
);


function App() {

const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(authMe())
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
      <Suspense fallback={<p> Loading...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:_id/edit" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/create" element={<AddPost />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Suspense>
      </Container>
    </BrowserRouter>
  );
}

export default App;
