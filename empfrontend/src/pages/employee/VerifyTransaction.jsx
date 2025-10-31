import { useNavigate } from "react-router-dom";
import AppSidebar from "../../../../frontend/src/components/AppSidebar";

export default function VerifyTransaction() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AppSidebar userType="employee" />
      <div
        style={{
          flex: 1,
          padding: "3rem 2rem",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#2a2a2a",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Verify Transaction
          </h1>
          <p
            style={{ color: "#bbb", marginBottom: "2rem", fontSize: "0.95rem" }}
          >
            Enter the SWIFT code below to verify its authenticity.
          </p>

          <form
            style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          >
            <input
              type="text"
              placeholder="SWIFT Code"
              required
              style={{
                padding: "0.9rem 1rem",
                borderRadius: "0.6rem",
                border: "1px solid #444",
                background: "#1e1e1e",
                color: "#fff",
                fontSize: "0.95rem",
              }}
            />
            <button type="submit" style={primaryBtn}>
              Verify
            </button>
          </form>

          <button
            style={{ ...secondaryBtn, marginTop: "1.5rem" }}
            onClick={() => navigate("/empDashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

const primaryBtn = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "1px solid #666",
  background: "transparent",
  color: "#bbb",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
};
