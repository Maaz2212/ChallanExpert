import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUV7BC-xtSYHA5JBWJrTsgm1srpPrjXnk",
  authDomain: "newchallan-c78a6.firebaseapp.com",
  projectId: "newchallan-c78a6",
  storageBucket: "newchallan-c78a6.firebasestorage.app",
  messagingSenderId: "90771717874",
  appId: "1:90771717874:web:7c0704bbbfadcfbaa69a6b",
  measurementId: "G-G7SHGB5NT5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { RecaptchaVerifier };
