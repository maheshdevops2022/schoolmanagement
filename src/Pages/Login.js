import React, {useState } from "react";
import "../assets/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Form Submitted");
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Please Login Into Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Login</button>
            <p>
              If You Don't Have an Account.Please <Link to="/register">Register here </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
