import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route, redirect
} from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/About";
import ErrorPage from "./Routes/Error/Error";
import Login from './Routes/SignIn';
import Footer from './components/Footer/Footer.component';
import Layout from './components/Layout';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { isAuth } from './utils/isAuth';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} loader={async () => {
      try {
        if (!await isAuth()) {
          return redirect('/login');
        }
        return null;
      } catch (error) {
        console.log({ error })
        throw redirect('/login');
      }
    }}
    />
    <Route path="about" element={<About />} />
    <Route path="login" element={<Login />} />
    <Route path="*" element={<ErrorPage />} />
  </Route>
));

function App() {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Container maxWidth="md" sx={{ flex: 1 }}>

          <RouterProvider sx={{ flex: 1 }} router={router} />
        </Container>
        <Footer />
      </Box>
    </React.Fragment >
  );
}

export default App;
