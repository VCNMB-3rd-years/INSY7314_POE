import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

import Login from "./pages/account/Login.jsx";
import Register from "./pages/account/Register.jsx";

import CustDashboard from "./pages/customer/CustDashboard.jsx";
import CustTransactions from "./pages/customer/CustTransactions.jsx";
import CreateTransaction from "./pages/customer/CreateTransaction.jsx";

import EmpDashboard from "./pages/employee/EmpDashboard.jsx";
import AllTransactions from "./pages/employee/AllTransactions.jsx";
import VerifyTransaction from "./pages/employee/VerifyTransaction.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Landing />} />

        {/* Account Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Routes */}
        <Route path="/custDashboard" element={<CustDashboard />} />
        <Route path="/createTransaction" element={<CreateTransaction />} />
        <Route path="/custTransactions" element={<CustTransactions />} />

        {/* Employee Routes */}
        <Route path="/empDashboard" element={<EmpDashboard />} />
        <Route path="/viewTransactions" element={<AllTransactions />} />
        <Route path="/verifyTransaction" element={<VerifyTransaction />} />
      </Routes>
    </Router>
  );
}

export default App;
