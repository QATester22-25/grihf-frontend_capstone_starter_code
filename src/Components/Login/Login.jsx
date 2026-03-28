import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.authtoken) {
        sessionStorage.setItem("auth-token", data.authtoken);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("name", data.name); // <-- now this works!
        navigate("/");
        window.location.reload();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h1>Login</h1>
        </div>
        <div className="login-text">
          Are you a new member?{" "}
          <span style={{ color: "#96a5b1" }}>
            <Link to="/SignUp">Sign Up Here</Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
            )}
            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => {
                  setEmail("");
                  setPassword("");
                  setError("");
                }}
              >
                Reset
              </button>
            </div>
            <br />
            <div className="login-text forgot-pass">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
