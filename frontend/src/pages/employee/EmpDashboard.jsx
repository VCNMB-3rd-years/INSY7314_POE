import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

export default function EmpDashboard() {
  const navigate = useNavigate();

  const viewTransactions = () => {
    navigate("/viewTransactions");
  };

  return (
    <>
      <BankNavbar userType="employee" />
      <div className="page-container" style={{ padding: "2rem" }}>
        <h1>Employee Dashboard</h1>
        <p>
          Welcome! As an employee, you can view and verify all transactions in
          the system.
        </p>
        <button onClick={viewTransactions}>View All Transactions</button>
      </div>
    </>
  );
}
