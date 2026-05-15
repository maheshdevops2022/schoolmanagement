import React, { useState } from "react";
import "../assets/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (form.password !== form.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      console.log(response.data);

      alert("Registration Successful");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Create Your Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-container">

            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

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
              <label>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
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

            <p>
              If You Have an Account, Please{" "}
              <Link to="/">Login here</Link>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;