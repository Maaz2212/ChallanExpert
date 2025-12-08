import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/signup.css" // ← New CSS file

export default function Signup() {
  const navigate = useNavigate();
  const { adminSignup } = useAuth();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    masterKey: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await adminSignup(formData.email, formData.password, formData.masterKey);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <h2 className="signup-title">Create Account</h2>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
          </div>

          <div className="input-group">
            <label>MasterKey</label>
            <input
              type="password"
              name="masterKey"
              required
              value={formData.masterKey}
              onChange={handleChange}
              placeholder="Enter MasterKey"
            />
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}
