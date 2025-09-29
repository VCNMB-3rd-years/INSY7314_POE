import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Account
import Login from "./pages/account/Login.jsx";
import Register from "./pages/account/Register.jsx";

// Customer
import CustDashboard from "./pages/customer/CustDashboard.jsx";
import CustTransactions from "./pages/customer/CustTransactions.jsx";
import CreateTransaction from "./pages/customer/CreateTransaction.jsx";

// Employee
import EmpDashboard from "./pages/employee/EmpDashboard.jsx";
import AllTransactions from "./pages/employee/AllTransactions.jsx";
import VerifyTransaction from "./pages/employee/VerifyTransaction.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Account */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer */}
        <Route path="/cust">
          <Route path="dashboard" element={<CustDashboard />} />
          <Route path="createTransaction" element={<CreateTransaction />} />
          <Route path="transactions" element={<CustTransactions />} />
        </Route>

        {/* Employee */}
        <Route path="/emp">
          <Route path="dashboard" element={<EmpDashboard />} />
          <Route path="transactions" element={<AllTransactions />} />
          <Route path="verify" element={<VerifyTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
