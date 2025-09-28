import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

export default function CustTransactions() {
  const navigate = useNavigate();

  // This will allow a customer to view all their transactions by cust id
  const backToDash = () => {
    navigate("/custDashboard");
  };

  return (
    <>
      <BankNavbar userType="customer" />
      <div className="page-container" style={{ padding: "2rem" }}>
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
    </>
  );
}
