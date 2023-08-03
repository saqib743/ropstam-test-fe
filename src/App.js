import "./App.css";

import { ThemeProvider } from "@mui/styles";

import theme from "./resources/themes/themes";

import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import SignIn from "./views/SignIn";
import Signup from "./views/Signup";
import Cars from "./views/Cars";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./components/AppBar";
import Categories from "./views/Categories";
function App() {
  const location = useLocation();
  const router = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      router("/login");
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        {location.pathname.includes("/login") !== true &&
          location.pathname.includes("/signup") !== true && (
            <ResponsiveAppBar />
          )}
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
