import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Sidebar from "./Components/sidebar";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";
import Classes from "./Pages/Classes";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <>
      <Sidebar />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
    </>
  );
}

export default App;
