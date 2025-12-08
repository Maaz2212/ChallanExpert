import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css"; 

export default function Login() {
  const { sendOtp, verifyOtp, adminLogin } = useAuth();
  const [mode, setMode] = useState("user");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/dashboard";
  const vehicle = searchParams.get("vehicle");

  const sendOtpHandler = () => {
    setError("");
    if (!mobile || mobile.length !== 10) {
      setError("Enter a valid mobile number");
      return;
    }
    sendOtp("+91" + mobile);
    setStep("otp");
  };

  const verifyOtpHandler = async () => {
    setError("");
    try {
      const user = await verifyOtp(otp);
      if (!user) {
        setError("Invalid OTP");
        return;
      }
      if (vehicle) navigate(`${redirect}?vehicle=${vehicle}`);
      else navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const adminSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await adminLogin(adminEmail, adminPassword);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-bg">
      <div id="recaptcha-container"></div>

      <div className="login-card login-container">
        <div className="login-title">Login</div>

        {/* Mode Switch */}
        <div className="mode-switch">
          <button
            className={mode === "user" ? "active" : ""}
            onClick={() => {
              setMode("user");
              setError("");
            }}
          >
            User
          </button>
          <button
            className={mode === "admin" ? "active" : ""}
            onClick={() => {
              setMode("admin");
              setError("");
            }}
          >
            Admin
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {/* USER LOGIN */}
        {mode === "user" && (
          <>
            {step === "mobile" && (
              <div className="field-group">
                <label>Mobile No.</label>

                <div className="input-wrap">
                  <input
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                  />
                  <i className="icon-user"></i>
                </div>

                <button className="btn-primary" onClick={sendOtpHandler}>
                  Send OTP
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="field-group">
                <label>Enter OTP</label>

                <div className="input-wrap">
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                  />
                  <i className="icon-lock"></i>
                </div>

                <button className="btn-primary" onClick={verifyOtpHandler}>
                  Verify OTP
                </button>

                <button
                  className="back-btn"
                  onClick={() => setStep("mobile")}
                >
                  Change Mobile Number
                </button>
              </div>
            )}
          </>
        )}

        {/* ADMIN */}
        {mode === "admin" && (
          <form onSubmit={adminSubmitHandler} className="field-group">
            <label>Email</label>
            <div className="input-wrap">
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Admin Email"
              />
              <i className="icon-user"></i>
            </div>

            <label>Password</label>
            <div className="input-wrap">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Password"
              />
              <i className="icon-lock"></i>
            </div>

            <button className="btn-primary" type="submit">
              Login as Admin
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
