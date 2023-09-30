import React, { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/About";
import ErrorPage from "./Routes/Error/Error";
import Login from "./Routes/SignIn";
import Footer from "./components/Footer/Footer.component";
import Layout from "./components/Layout";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { isAuth } from "./utils/isAuth";
import { me } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
        caseSensitive: false,
        loader: async () => {
          try {
            if (!(await isAuth())) {
              return redirect("/login");
            }
            return null;
          } catch (error) {
            console.log({ error });
            throw redirect("/login");
          }
        }
      },
      {
        element: <Login />,
        path: "/login",
        caseSensitive: false
      },
      {
        element: <About />,
        path: "about",
        caseSensitive: false
      },
      {
        element: <ErrorPage />,
        path: "*",
        caseSensitive: false
      }
    ]
  }
]);

function App() {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    // if user does not exist in redux store, fetch user from server
    if (!user) {
      dispatch(me());
    }
  }, [user, dispatch]);

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <RouterProvider router={router} />
        </Container>
        <Footer />
      </Box>
    </React.Fragment>
  );
}

export default App;
