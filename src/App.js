import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Sidebar from "./Components/sidebar";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";
import Classes from "./Pages/Classes";

function App() {
  return (
    <>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/classes" element={<Classes/>} />
      </Routes>
    </>
  );
}

export default App;
