import AppSidebar from "../../components/AppSidebar";
import { useNavigate } from "react-router-dom";

export default function AllTransactions() {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      sender: "customer1",
      receiver: "customer2",
      amount: 500,
      status: "Completed",
    },
    {
      id: 2,
      sender: "customer3",
      receiver: "customer4",
      amount: 1200,
      status: "Pending",
    },
    {
      id: 3,
      sender: "customer2",
      receiver: "customer1",
      amount: 250,
      status: "Completed",
    },
  ];

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
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          All Transactions
        </h1>
        <p style={{ color: "#bbb", marginBottom: "2rem" }}>
          Here you can view all transactions processed by the system.
        </p>

        <div
          style={{
            background: "#2a2a2a",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
          }}
        >
          <table
            style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}
          >
            <thead>
              <tr style={{ background: "#374151" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Sender</th>
                <th style={thStyle}>Receiver</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: "1px solid #444" }}>
                  <td style={tdStyle}>{tx.id}</td>
                  <td style={tdStyle}>{tx.sender}</td>
                  <td style={tdStyle}>{tx.receiver}</td>
                  <td style={tdStyle}>R {tx.amount}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          tx.status === "Completed" ? "#16a34a" : "#facc15",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        color: "#000",
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button
            style={secondaryBtn}
            onClick={() => navigate("/empDashboard")}
          >
            Back to Dashboard
          </button>
          <button
            style={primaryBtn}
            onClick={() => navigate("/verifyTransaction")}
          >
            Verify Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "0.75rem",
  fontWeight: "600",
  color: "#e5e7eb",
};

const tdStyle = {
  padding: "0.75rem",
  fontSize: "0.95rem",
  color: "#ddd",
};

const primaryBtn = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "none",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
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
  transition: "background 0.2s, transform 0.2s",
};
