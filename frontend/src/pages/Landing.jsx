import React from "react";
import { useNavigate } from "react-router-dom";
import BankNavbar from "../components/BankNavbar";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <BankNavbar userType="guest" />

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-overlay"></div>
        <div className="landing-container">
          <h1 className="fade-in">
            Where Every <span className="highlight">Payment</span> Links the
            World.
          </h1>
          <p className="fade-in-delay">
            Coinnect is your secure, modern banking platform. Manage your
            transactions, track activity, and connect with confidence.
          </p>
          <button
            className="signup-btn pulse"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="info-section fade-up">
        <h2>About Us</h2>
        <p>
          At Coinnect, we believe banking should be simple, transparent, and
          modern. Our mission is to bridge customers and businesses with
          seamless transactions backed by trust and technology.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="feature fade-up">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Bank-level encryption and fraud protection built in.</p>
        </div>
        <div className="feature fade-up delay">
          <div className="feature-icon">⚡</div>
          <h3>Fast</h3>
          <p>Transactions verified and processed in real time.</p>
        </div>
        <div className="feature fade-up delay2">
          <div className="feature-icon">🌍</div>
          <h3>Connected</h3>
          <p>Seamlessly send and receive across borders with ease.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="info-section fade-up">
        <h2>Contact Us</h2>
        <p>
          Have questions? Reach us at{" "}
          <a href="mailto:support@coinnect.com">support@coinnect.com</a>.
        </p>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Coinnect. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Landing;
