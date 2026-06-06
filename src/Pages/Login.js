import React, { useState } from "react";
import "../assets/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);

      const role = response.data.role;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      alert("Login Successful");

      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "teacher") {
        navigate("/teachers");
      } else if (role === "student") {
        navigate("/students");
      } else if (role === "hod") {
        navigate("/hod");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="top-section">
          <h1>🏫 School Management System</h1>
          <p>Welcome Back</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button className="login-btn">Login</button>

          <p className="register">
            Don't have account?
            <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
