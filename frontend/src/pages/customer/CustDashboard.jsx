import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

export default function CustDashboard() {
  const navigate = useNavigate();

  const createTransaction = () => {
    navigate("/createTransaction");
  };
  const viewCustTransactions = () => {
    navigate("/custTransactions");
  };

  return (
    <>
      <BankNavbar userType="customer" />
      <div className="page-container" style={{ padding: "2rem" }}>
        <h1>Customer Dashboard</h1>
        <p>
          Welcome to your dashboard! Here you can create new transactions and
          view your transaction history.
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button onClick={createTransaction}>Create Transaction</button>
          <button onClick={viewCustTransactions}>View My Transactions</button>
        </div>
      </div>
    </>
  );
}
