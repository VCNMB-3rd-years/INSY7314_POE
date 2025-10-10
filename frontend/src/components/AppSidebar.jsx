import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  List,
  Menu,
  X,
  ShieldCheck,
  FolderOpen,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { logout as apiLogout } from "../services/apiService";
import "./AppSidebar.css";

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const userType = user?.userType || "customer";

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout(localStorage.getItem("token"));
    } catch {}
    logout();
    navigate("/login");
  };

  return (
    <nav className={`app-sidenav ${collapsed ? "collapsed" : ""}`}>
      <div className="app-logo">
        <img src="/coinnect.png" alt="Coinnect Logo" />
        {!collapsed && <span className="app-brand">Coinnect</span>}
      </div>

      <div className="app-links">
        {userType === "customer" ? (
          <>
            <NavLink to="/custDashboard" className={({ isActive }) => isActive ? "app-link active" : "app-link"} end>
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/createTransaction" className={({ isActive }) => isActive ? "app-link active" : "app-link"}>
              <PlusCircle size={20} />
              {!collapsed && <span>Create Transaction</span>}
            </NavLink>
            <NavLink to="/custTransactions" className={({ isActive }) => isActive ? "app-link active" : "app-link"}>
              <List size={20} />
              {!collapsed && <span>View Transactions</span>}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/empDashboard" className={({ isActive }) => isActive ? "app-link active" : "app-link"} end>
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/viewTransactions" className={({ isActive }) => isActive ? "app-link active" : "app-link"}>
              <FolderOpen size={20} />
              {!collapsed && <span>All Transactions</span>}
            </NavLink>
            <NavLink to="/verifyTransaction" className={({ isActive }) => isActive ? "app-link active" : "app-link"}>
              <ShieldCheck size={20} />
              {!collapsed && <span>Verify Transactions</span>}
            </NavLink>
          </>
        )}
      </div>

      <button className="app-logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>

      <button
        className="app-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <Menu size={22} /> : <X size={22} />}
      </button>
    </nav>
  );
}
