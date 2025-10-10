import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BankNavbar.css";

const BankNavbar = ({ userType = "guest", variant = "dark" }) => {
  const navigate = useNavigate();
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bank-navbar ${variant === "gradient" ? "navbar-gradient" : ""} ${
        isShrunk ? "navbar-shrink" : ""
      }`}
    >
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <img src="/coinnect.png" alt="Coinnect Logo" />
          <span>Coinnect</span>
        </Link>
      </div>

      <ul className="navbar-links">
        {userType === "guest" && (
          <>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <button
                className="navbar-signup-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </li>
            <li>
              <button
                className="navbar-signup-btn"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </li>
          </>
        )}

        {userType === "customer" && (
          <>
            <li>
              <Link to="/custDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/custTransactions">Transactions</Link>
            </li>
            <li>
              <Link to="/createTransaction">New Transaction</Link>
            </li>
          </>
        )}

        {userType === "employee" && (
          <>
            <li>
              <Link to="/empDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/viewTransactions">All Transactions</Link>
            </li>
            <li>
              <Link to="/verifyTransaction">Verify</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default BankNavbar;
