import { useNavigate } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";

export default function CustDashboard() {
  const navigate = useNavigate();
  const backToDash = () => {
    navigate("/custDashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#242424" }}>
      <AppSidebar userType="customer" />
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <h1>Customer Dashboard</h1>
        <p>
          Welcome to your dashboard! Here you can create new transactions and
          view your transaction history.
        </p>
      </div>
    </div>
  );
}
