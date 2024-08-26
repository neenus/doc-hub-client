import React, { useEffect, lazy } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const Home = lazy(() => import("./Routes/Home"));
const About = lazy(() => import("./Routes/About"));
const ErrorPage = lazy(() => import("./Routes/Error/Error"));
const AddUser = lazy(() => import("./Routes/Admin/AddUser"));
const EditUser = lazy(() => import("./Routes/Admin/EditUser"));
const Login = lazy(() => import("./Routes/SignIn"));
const Admin = lazy(() => import("./Routes/Admin/Admin"));
const MyFiles = lazy(() => import("./Routes/MyFiles"));
import Loader from "./components/Loader/Loader.component";
import Footer from "./components/Footer/Footer.component";
import Layout from "./components/Layout";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { me } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { selectAuth } from "./features/auth/authSlice";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import ProtectedRoute from "./components/PrivateRoutes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        path: "/",
        caseSensitive: false,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: "/admin",
        caseSensitive: false,
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        )
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
        path: "myfiles",
        caseSensitive: false,
        element: (
          <ProtectedRoute>
            <MyFiles />
          </ProtectedRoute>
        )
      },
      {
        path: "/admin/add-user",
        caseSensitive: false,
        element: (
          <AdminRoute>
            <AddUser />
          </AdminRoute>
        )
      },
      {
        path: "/admin/edit-user/:id",
        caseSensitive: false,
        element: (
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        )
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
  const auth = useSelector(selectAuth);

  useEffect(() => {
    // if user does not exist in redux store, fetch user from server
    if (!user) {
      dispatch(me());
    }
  }, [user, dispatch]);

  return (
    <React.Fragment>
      {auth.isLoading && <Loader loading={true} />}
      <ToastContainer />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Container maxWidth="lg" sx={{ flex: 1 }}>
          <RouterProvider router={router} />
        </Container>
        <Footer />
      </Box>
    </React.Fragment>
  );
}

export default App;
