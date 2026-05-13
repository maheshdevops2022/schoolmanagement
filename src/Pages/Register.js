import React, { useState } from "react";
import "../assets/Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    mobilenumber: "",
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmpassword) {
      alert("Password Does Not Match");
      return;
    }
    alert("Form Submitted");
  };
  return (
    <div className="container">
      <div className="login-container">
        <h1>Create Your Account</h1>

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
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobilenumber"
                value={form.mobilenumber}
                onChange={handleChange}
                maxLength="10"
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

            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Register</button>
            <p>If You Have an Account.Please <Link to="/login">Login here </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
