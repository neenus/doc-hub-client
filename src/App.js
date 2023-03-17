import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/About";
import ErrorPage from "./Routes/Error/Error";
import Footer from './components/Footer/Footer.component';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);

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
