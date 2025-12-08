import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
export default function Navbar() {
    const [open , setOpen] = useState(false)

    return (
    <>
      {/* NAVBAR */}
      <header className="bg-white shadow-sm border-b fixed top-0 w-full z-50 py-2">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LOGO + TEXT */}
            <Link to="/" className="flex items-center">
              <img
                src="/challan.png"
                alt="ChallanExpert Logo"
                className="h-18 w-18 mr-3"
              />
              <div className="flex flex-col items-start leading-tight">
                <div className="text-2xl font-bold text-gray-700">
                  ChallanExpert
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-600 animate-pulse">
                  Smart, Fast & Reliable — Settle Your Challans Easily
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-5">
                <a href="#home" className="text-gray-900 hover:text-indigo-700 px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="#about" className="text-gray-900 hover:text-indigo-700 px-3 py-2 text-sm font-medium">
                  About
                </a>
                <a href="#services" className="text-gray-900 hover:text-indigo-700 px-3 py-2 text-sm font-medium">
                  Services
                </a>
                <a href="#benefits" className="text-gray-900 hover:text-indigo-700 px-3 py-2 text-sm font-medium">
                  Benefits
                </a>

                <Link
                  to="/login"
                  className="hover:text-indigo-600 whitespace-nowrap"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* DESKTOP SIGNUP CTA */}
            <div className="hidden md:block">
              <Link
                to="/signup"
                className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 font-medium"
              >
                Signup
              </Link>
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="md:hidden">
              <button
                className="text-gray-900 hover:text-indigo-700 transition"
                onClick={() => setOpen(!open)}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* MOBILE SLIDE-IN PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-xl z-40 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
          <nav className="px-5 py-9 space-y-6 text-gray-900">
            <a href="#home" className="block hover:text-indigo-700">
              Home
            </a>
            <a href="#about" className="block hover:text-indigo-700">
              About
            </a>
            <a href="#services" className="block hover:text-indigo-700">
              Services
            </a>
            <a href="#benefits" className="block hover:text-indigo-700">
              Benefits
            </a>

            <Link to="/login" className="block hover:text-indigo-700">
              Sign In
            </Link>

            <Link
              to="/signup"
              className="mt-3 bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 inline-block"
            >
              Signup
            </Link>
          </nav>
      </div>
    </>
  );
}