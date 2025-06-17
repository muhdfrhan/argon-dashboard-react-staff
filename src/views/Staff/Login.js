// src/views/Staff/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zakatLogo from "assets/img/zakat-logo.png";
import { login as staffLoginApi } from '../../apicall'; // Import login function from apicall.js

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true

    if (username && password) {
      try {
        // Use staffLoginApi from apicall.js
        // The login function in apicall.js already handles localStorage
        const data = await staffLoginApi(username, password);

        // Assuming staffLoginApi throws an error for non-ok responses
        // or returns a specific structure for errors which apicall.js would handle.
        // The current apicall.js login function stores token/user info itself.
        // It returns response.data which might or might not have an error property.
        // For this example, assuming success if no error is thrown and data.token exists.

        if (data && data.token) { // Check if data and token exist from response
            localStorage.setItem("role", "staff"); // Already set by apicall.js if response.data.user.role is provided
            // username and staffName are set by apicall.js
            navigate("/staff/dashboard");
        } else {
            // If apicall.js doesn't throw but returns an error message in data
            setError(data.error || "Login failed. Please check credentials.");
        }
      } catch (err) {
        console.error("Login API call failed:", err);
        // err.response.data.error (from axios error) or err.message
        setError(err.response?.data?.error || err.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false); // Set loading to false
      }
    } else {
      setError("Please enter both username and password.");
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="container mt-7 d-flex justify-content-center">
      <div className="col-lg-5 col-md-7">
        <div className="card bg-secondary shadow" style={{ border: "2px solid #007bff" }}>
          <div className="card-header bg-white pb-5 text-center">
            <img
              src={zakatLogo}
              alt="Zakat Logo"
              className="img-fluid d-block mx-auto my-3"
              style={{ maxWidth: "120px", height: "auto" }}
            />
            <h2 className="text-muted">Staff Login</h2>
            <h4 className="text-muted">Welcome Back!</h4>
            <hr />
             <p className="text-muted">Please enter your staff credentials to access your account.</p>
          </div>
          <div className="card-body px-lg-5 py-lg-1">
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}
            <form role="form" onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label className="form-control-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-alternative"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-alternative"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary my-4 w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          <small>© {new Date().getFullYear()} Zakat Aid System</small>
        </div>
      </div>
    </div>
  );
};

export default Login;