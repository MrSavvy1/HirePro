import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleSignupClick = () => {
    setPage("whoAreYou");
  };

  const handleRoleClick = (role) => {
    setFormData({ ...formData, role });
    setPage("signup");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
      );
      if (res.data.success) {
        setPage("login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData,
      );
      if (res.data.success) {
        setPage("welcome");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {page === "home" && (
        <div className="container">
          <h1>Welcome to HirePro</h1>
          <button onClick={handleSignupClick}>Sign Up</button>
          <button onClick={() => setPage("login")}>Login</button>
        </div>
      )}
      {page === "whoAreYou" && (
        <div className="form-container">
          <h2>Who are you?</h2>
          <button onClick={() => handleRoleClick("employer")}>Employee</button>
          <button onClick={() => handleRoleClick("company")}>Company</button>
        </div>
      )}
      {page === "signup" && (
        <form className="form-container" onSubmit={handleSignupSubmit}>
          <h2>Create your account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {page === "login" && (
        <form className="form-container" onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            onChange={handleLoginInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={handleLoginInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
      {page === "welcome" && (
        <div className="container">
          <h1>Welcome to Jobs</h1>
        </div>
      )}
    </div>
  );
}

export default App;
