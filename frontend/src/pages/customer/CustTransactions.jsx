import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";

export default function CustTransactions() {
  const navigate = useNavigate();

  // This will allow a customer to view all their transactions by cust id
  const backToDash = () => {
    navigate("/custDashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#242424" }}>
      <AppSidebar userType="customer" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1>My Transactions</h1>
        <p>
          Here you can view all your past transactions. For more details, select
          a transaction below.
        </p>
        {/* Transaction list would go here */}
        <button style={{ marginTop: "2rem" }} onClick={backToDash}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
