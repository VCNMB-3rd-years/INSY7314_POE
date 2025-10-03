import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  List,
  Menu,
  X,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";
import "./AppSidebar.css";

export default function AppSidebar({ userType = "customer" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`app-sidenav ${collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="app-logo">
        <img src="/coinnect.png" alt="Coinnect Logo" />
        {!collapsed && <span className="app-brand">Coinnect</span>}
      </div>

      {/* Links */}
      <div className="app-links">
        {userType === "customer" ? (
          <>
            <NavLink
              to="/custDashboard"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
              end
            >
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/createTransaction"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
            >
              <PlusCircle size={20} />
              {!collapsed && <span>Create Transaction</span>}
            </NavLink>

            <NavLink
              to="/custTransactions"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
            >
              <List size={20} />
              {!collapsed && <span>View Transactions</span>}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/empDashboard"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
              end
            >
              <Home size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/viewTransactions"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
            >
              <FolderOpen size={20} />
              {!collapsed && <span>All Transactions</span>}
            </NavLink>

            <NavLink
              to="/verifyTransaction"
              className={({ isActive }) =>
                isActive ? "app-link active" : "app-link"
              }
            >
              <ShieldCheck size={20} />
              {!collapsed && <span>Verify Transactions</span>}
            </NavLink>
          </>
        )}
      </div>

      {/* Collapse Button */}
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
