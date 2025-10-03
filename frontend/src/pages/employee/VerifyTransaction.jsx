import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import BankNavbar from "../../components/BankNavbar";

export default function VerifyTransaction() {
  const navigate = useNavigate();

  const backToDash = () => {
    navigate("/empDashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#242424" }}>
      <AppSidebar userType="employee" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1>Verify Transaction</h1>
        <p>
          Enter the SWIFT code or transaction details below to verify its
          authenticity.
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            gap: "1rem",
          }}
        >
          <input type="text" placeholder="SWIFT Code" required />
          <button type="submit">Verify</button>
        </form>
        <button style={{ marginTop: "2rem" }} onClick={backToDash}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
