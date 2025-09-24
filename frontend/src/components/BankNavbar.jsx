import React from "react";
import { Link } from "react-router-dom";
import "./BankNavbar.css";

const BankNavbar = ({ userType = "guest" }) => {
  return (
    <nav className="bank-navbar">
      <div className="navbar-logo">
        <img src="/vite.svg" alt="BankLinQ Logo" />
        <span>BankLinQ</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {userType === "guest" && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
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
