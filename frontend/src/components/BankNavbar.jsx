import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BankNavbar.css";

const BankNavbar = ({ userType = "guest" }) => {
  const navigate = useNavigate();

  return (
    <nav className="bank-navbar">
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
              <Link to="/login">About</Link>
            </li>
            <li>
              <Link to="/login">Contact</Link>
            </li>
            <li>
              <button
                className="navbar-signup-btn"
                onClick={() => navigate("/register")}
              >
                Sign Up / Login
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
