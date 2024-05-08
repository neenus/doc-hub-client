import React, { useEffect, lazy } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
const Home = lazy(() => import("./Routes/Home"));
const About = lazy(() => import("./Routes/About"));
const ErrorPage = lazy(() => import("./Routes/Error/Error"));
const AddUser = lazy(() => import("./Routes/Admin/AddUser"));
const Login = lazy(() => import("./Routes/SignIn"));
const Admin = lazy(() => import("./Routes/Admin"));
const MyFiles = lazy(() => import("./Routes/MyFiles"));
import Loader from "./components/Loader/Loader.component";
import Footer from "./components/Footer/Footer.component";
import Layout from "./components/Layout";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { isAuth } from "./utils/isAuth";
import { me } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ToastContainer } from "react-toastify";
import { selectAuth } from "./features/auth/authSlice";
import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
  position: "bottom-right",
  autoClose: 6000,
  hideProgressBar: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored"
};

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
            toast.error(
              "Server error. Please try again later or contact support",
              options
            );
            throw redirect("/login");
          }
        }
      },
      {
        element: <Admin />,
        path: "/admin",
        caseSensitive: false,
        loader: async () => {
          try {
            if (!(await isAuth())) {
              return redirect("/login");
            }
            return null;
          } catch (error) {
            toast.error(
              "Server error. Please try again later or contact support",
              options
            );
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
        element: <MyFiles />,
        path: "myfiles",
        caseSensitive: false,
        loader: async () => {
          try {
            if (!(await isAuth())) {
              return redirect("/login");
            }
            return null;
          } catch (error) {
            toast.error(
              "Server error. Please try again later or contact support",
              options
            );
            throw redirect("/login");
          }
        }
      },
      {
        element: <AddUser />,
        path: "/admin/add-user",
        caseSensitive: false,
        loader: async () => {
          try {
            if (!(await isAuth())) {
              return redirect("/login");
            }
            return null;
          } catch (error) {
            toast.error(
              "Server error. Please try again later or contact support",
              options
            );
            throw redirect("/login");
          }
        }
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
