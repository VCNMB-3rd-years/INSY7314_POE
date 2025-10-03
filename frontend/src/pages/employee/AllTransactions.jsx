import BankNavbar from "../../components/BankNavbar";
import AppSidebar from "../../components/AppSidebar";
import { useNavigate } from "react-router-dom";

export default function AllTransactions() {
  const navigate = useNavigate();

  const backToDash = () => {
    navigate("/empDashboard");
  };
  const verifySwiftCode = () => {
    navigate("/verifyTransaction");
  };

  // Example transaction data (replace with real data later)
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
        background: "#213547",
      }}
    >
      <AppSidebar userType="employee" />
      <div
        style={{
          flex: 1,
          padding: "3rem 2rem",
          color: "#fff",
        }}
      >
        <h1>All Transactions</h1>
        <p>
          Here you can view all transactions processed by the system. Select a
          transaction for more details or verify a SWIFT code.
        </p>
        <table
          style={{
            width: "100%",
            margin: "2rem 0",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#eaf6fb" }}>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{tx.id}</td>
                <td>{tx.sender}</td>
                <td>{tx.receiver}</td>
                <td>R {tx.amount}</td>
                <td>{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={backToDash}>Back to Dashboard</button>
          <button onClick={verifySwiftCode}>Verify Transaction</button>
        </div>
      </div>
    </div>
  );
}
