import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";
import { getTransaction } from "../../services/apiService";

export default function CustTransactions() {
  const navigate = useNavigate();
  const backToDash = () => {
    navigate("/custDashboard");
  };
  
const fetchTransactions = async () => {
    // fetch all transactions using the apiService method we created earlier, storing the response in a temp variable
    const res = await getTransaction();
    // and update our transactions variable with the response data
    setTransactions(res.data);
  };
  // this method will run as soon as the page is loaded
  useEffect(() => {
    // fetching all of the books in the background
    fetchTransactions();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#1a1a1a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <AppSidebar userType="customer" />
      <div
        style={{
          flex: 1,
          padding: "3rem 2rem",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            background: "#2a2a2a",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            📜 My Transactions
          </h1>
          <p
            style={{ color: "#bbb", marginBottom: "2rem", fontSize: "0.95rem" }}
          >
            Here you can view all your past transactions.
          </p>

          {/* Transaction list */}
          {transactions.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "1.5rem",
              }}
            >
              <thead>
                <tr style={{ textAlign: "left", color: "#bbb" }}>
                  <th style={tableHeader}>Recipient</th>
                  <th style={tableHeader}>Amount</th>
                  <th style={tableHeader}>Reference</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    style={{
                      borderBottom: "1px solid #444",
                    }}
                  >
                    <td style={tableCell}>{t.recipient}</td>
                    <td style={tableCell}>{t.amount}</td>
                    <td style={tableCell}>{t.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "#888" }}>No transactions yet. 💡</p>
          )}

          <button
            style={{
              ...buttonSecondaryStyle,
              width: "100%",
            }}
            onClick={backToDash}
          >
            ⬅ Back to Dashboard
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
