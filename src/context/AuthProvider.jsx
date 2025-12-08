import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    setUser(saved ? JSON.parse(saved) : null);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ---------------- OTP ----------------
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  const sendOtp = async (phone) => {
    setupRecaptcha();
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      window.confirmationResult = result;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const firebaseUser = result.user;

      setUser({
        role: "user",
        mobile: firebaseUser.phoneNumber,
        uid: firebaseUser.uid,
      });

      return firebaseUser;
    } catch {
      return null;
    }
  };

  // ---------------- Admin ----------------
  const SUPER_KEYS = [
    "myKey@2024", "myKey@2025", "myKey@2026",
    "myKey@2027", "myKey@2028", "myKey@2029",
    "myKey@2030", "myKey@2031", "myKey@2032", "myKey@2033",
  ];

  const adminSignup = (email, password, masterKey) => {
    if (!SUPER_KEYS.includes(masterKey)) throw new Error("Unauthorized action");

    const admins = JSON.parse(localStorage.getItem("admins") || "[]");

    if (admins.find((a) => a.email === email))
      throw new Error("Admin already exists");

    admins.push({ email, password });
    localStorage.setItem("admins", JSON.stringify(admins));
  };

  const adminLogin = (email, password) => {
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    const found = admins.find((a) => a.email === email && a.password === password);
    if (!found) throw new Error("Invalid admin credentials");

    setUser({ role: "admin", email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        sendOtp,
        verifyOtp,
        adminLogin,
        adminSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
