import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white my-5 mx-12">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            to="/"
            className="navbar-logo-link flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/coinnect.png" alt="Coinnect Logo" className="h-8" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              Coinnect
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-cta"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation Links - Pushed to the right */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "flex" : "hidden"
          }`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:ml-auto">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 md:p-0 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 transition-colors duration-200"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 md:p-0 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-3 md:p-0 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 md:p-0 text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
