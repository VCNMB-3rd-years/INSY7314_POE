import React from "react";
import { useNavigate } from "react-router-dom";
import BankNavbar from "../components/BankNavbar";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <BankNavbar userType="guest" />
      <div className="landing-container">
        <h1>Where Every Payment Links the World.</h1>
        <p>
          Coinnect is your secure, modern banking platform. Sign up today to
          manage your transactions, view your dashboard, and more!
        </p>
        <button className="signup-btn" onClick={() => navigate("/register")}>
          Sign Up / Login
        </button>
      </div>
    </>
  );
};

export default Landing;
