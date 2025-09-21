import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import "./App.css";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Home from "./Routes/Home";
import About from "./Routes/About";
import ErrorPage from "./Routes/Error/Error";
import AddUser from "./Routes/Admin/AddUser";
import EditUser from "./Routes/Admin/EditUser";
import Login from "./Routes/SignIn";
import Admin from "./Routes/Admin/Admin";
import MyFiles from "./Routes/MyFiles";
import Footer from "./components/Footer/Footer.component";
import Layout from "./components/Layout";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/PrivateRoutes/AdminRoute";
import ProtectedRoute from "./components/PrivateRoutes/ProtectedRoute";
import { store, persistor } from "./store/store";


function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your session...</p>
      </div>
    </div>
  )
}

function AppContent() {
  return (
    <Router>
      {/* <Loader loading={true} /> */}
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ flex: 1 }}>
          <Layout />
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myfiles"
                element={
                  <ProtectedRoute>
                    <MyFiles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-user"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <AddUser />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-user/:id"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <EditUser />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Container>
        <Footer />
      </Box>
    </Router>
  )
}

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ToastContainer />
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

export default App;
