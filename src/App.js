import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
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
      <Container disableGutters maxWidth="false" sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box sx={{ flex: 1 }}>
          <RouterProvider sx={{ flex: 1 }} router={router} />
        </Box>
        <Footer />
      </Container>
    </React.Fragment >
  );
}

export default App;
