import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function CustTransactions() {
  const navigate = useNavigate();
  const { user, token } = useAuth(); // get current user info from AuthContext
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backToDash = () => {
    navigate("/custDashboard");
  };

  const fetchCustomerTransactions = async () => {
    if (!user?.customerId) {
      setError("Customer ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `https://localhost:3000/v1/transaction/customer/${user.customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.transactions || []);
    } catch (err) {
      console.error(
        "Error fetching customer transactions:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerTransactions();
  }, [user?.customerId, token]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>
      <AppSidebar userType="customer" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ background: "#2a2a2a", padding: "2rem", borderRadius: "1rem", boxShadow: "0 8px 20px rgba(0,0,0,0.3)", width: "100%", maxWidth: "700px" }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>My Transactions</h1>
          <p style={{ color: "#bbb", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Here you can view all your past transactions.
          </p>

          {/* Loading / Error */}
          {loading && <p style={{ color: "#888" }}>Loading transactions...</p>}
          {error && <p style={{ color: "#c62828" }}>{error}</p>}

          {/* Transaction List */}
          {!loading && !error && transactions.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "#bbb" }}>
                  <th style={{ padding: "0.5rem" }}>Recipient</th>
                  <th style={{ padding: "0.5rem" }}>Amount</th>
                  <th style={{ padding: "0.5rem" }}>Reference</th>
                  <th style={{ padding: "0.5rem" }}>Swift Code</th>
                  <th style={{ padding: "0.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.transactionId} style={{ borderBottom: "1px solid #444" }}>
                    <td style={{ padding: "0.5rem" }}>{t.recipientReference}</td>
                    <td style={{ padding: "0.5rem" }}>{t.amount}</td>
                    <td style={{ padding: "0.5rem" }}>{t.customerReference}</td>
                    <td style={{ padding: "0.5rem" }}>{t.swiftCode || "—"}</td>
                    <td style={{ padding: "0.5rem" }}>{t.status == "Pending "}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading && !error && <p style={{ color: "#888" }}>No transactions yet. </p>
          )}

          <button
            style={{ marginTop: "1rem", width: "100%", padding: "0.75rem", borderRadius: "0.5rem", background: "#555", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
            onClick={backToDash}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}


const tableHeader = {
  padding: "0.75rem 1rem",
  borderBottom: "1px solid #444",
  fontWeight: "600",
  fontSize: "0.95rem",
};

const tableCell = {
  padding: "0.75rem 1rem",
  fontSize: "0.95rem",
  color: "#eee",
};

const buttonSecondaryStyle = {
  padding: "0.9rem 1rem",
  borderRadius: "0.6rem",
  border: "1px solid #666",
  background: "transparent",
  color: "#bbb",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background 0.3s, transform 0.2s",
};
