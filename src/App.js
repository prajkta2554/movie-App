import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMovies from "./pages/admin/AdminMovies";
import ManageMovies from "./pages/admin/ManageMovies";

import ProtectedRoute from "./components/ProtectedRoute";

import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        {/* COMMON NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />

          {/*  ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/movies"
            element={
              <ProtectedRoute role="admin">
                <AdminMovies />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/manage"
            element={
              <ProtectedRoute role="admin">
                <ManageMovies />
              </ProtectedRoute>
            }
          />

          {/*FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* TOAST CONTAINER (ONLY ONCE) */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
