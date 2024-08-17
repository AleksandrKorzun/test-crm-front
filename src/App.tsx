import React from "react";
import "./App.css";
import { Box, Text } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SignUp } from "./pages/SIgnUp";
import { SignIn } from "./pages/SignIn";
import { Profile } from "./pages/Profile";
import { Header } from "./components/header";
import { PrivateRoute } from "./components/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Box h="100vh">
          <Header />
          <main>
            <Routes>
              <Route
                path="product"
                element={
                  <PrivateRoute>
                    <Text>Product Page</Text>
                  </PrivateRoute>
                }
              />
              <Route
                path="blog"
                element={
                  <PrivateRoute>
                    <Text>Blog Page</Text>
                  </PrivateRoute>
                }
              />
              <Route
                path="contact"
                element={
                  <PrivateRoute>
                    <Text>Contact Page</Text>
                  </PrivateRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Text>Home Page</Text>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
