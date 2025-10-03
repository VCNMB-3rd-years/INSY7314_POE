import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";

export default function CreateTransaction() {
  const navigate = useNavigate();
  const backToDash = () => {
    navigate("/custDashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#242424" }}>
      <AppSidebar userType="customer" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1>Create Transaction</h1>
        <p>
          Fill in the details below to send money securely and instantly to
          another account.
        </p>
        {/* Example form fields */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            gap: "1rem",
          }}
        >
          <input type="text" placeholder="Recipient Account" required />
          <input type="number" placeholder="Amount" required />
          <input type="text" placeholder="Reference" />
          <button type="submit">Send Transaction</button>
        </form>
        <button style={{ marginTop: "2rem" }} onClick={backToDash}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
