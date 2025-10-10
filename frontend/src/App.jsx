import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/account/Login.jsx";
import Register from "./pages/account/Register.jsx";

import CustDashboard from "./pages/customer/CustDashboard.jsx";
import CustTransactions from "./pages/customer/CustTransactions.jsx";
import CreateTransaction from "./pages/customer/CreateTransaction.jsx";

import EmpDashboard from "./pages/employee/EmpDashboard.jsx";
import AllTransactions from "./pages/employee/AllTransactions.jsx";
import VerifyTransaction from "./pages/employee/VerifyTransaction.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/custDashboard"
            element={
              <ProtectedRoute>
                <CustDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="/createTransaction" element={
            <ProtectedRoute>
              <CreateTransaction />
              </ProtectedRoute>
            } />
          <Route path="/custTransactions" element={
            <ProtectedRoute>
              <CustTransactions />
              </ProtectedRoute>} />

          <Route
            path="/empDashboard"
            element={
              <ProtectedRoute>
                <EmpDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/viewTransactions" element={<AllTransactions />} />
          <Route path="/verifyTransaction" element={<VerifyTransaction />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
