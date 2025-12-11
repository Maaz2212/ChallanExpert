// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COMPANY */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">ChallanExpert</h2>
          <p className="text-sm leading-relaxed">
            Your trusted partner for challan checks, settlements, and fast updates.
            Quick. Reliable. Secure.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#about" className="hover:text-indigo-400">About</a></li>
            <li><a href="#services" className="hover:text-indigo-400">Services</a></li>
            <li><a href="#benefits" className="hover:text-indigo-400">Benefits</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-indigo-400">Contact Us</a></li>
            <li><a href="#home" className="hover:text-indigo-400">Privacy Policy</a></li>
            <li><a href="#home" className="hover:text-indigo-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <p className="text-sm">support@challanexpert.com</p>
          <p className="text-sm mt-1">+91 98393 90906</p>
          <p className="text-sm mt-1">Shop No. 12, Nayyar Palace, Near Bobby Reastaurant, Amir Nishan, Aligarh UP</p>
          <a
  href="https://www.instagram.com/_challanexpert_?igsh=MWwzYmh6bGk5Zmp3MQ=="
  target="_blank"
  rel="noopener noreferrer"
  className="
    mt-3
    inline-flex items-center gap-2
    px-2 py-1
    rounded-lg
    bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]
    hover:opacity-90
    transition
  "
>
  <img
    src="/instagram.svg"
    alt="Instagram"
    className="w-5 h-5"
  />
  <span className="text-white text-sm">Follow us</span>
</a>
        </div>

      </div>
      <hr className="border-gray-700 my-6" />

      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ChallanExpert — All rights reserved.
      </p>
    </footer>
  );
}
