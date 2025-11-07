// src/components/admin/AdminEmployeeManagement.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { Users, UserPlus, Trash2, Search } from "lucide-react";

// Demo employee data
const employees = [
  {
    id: 101,
    username: "john.payment",
    email: "john.payment@coinnect.com",
    fullName: "John Smith",
    department: "Payment Processing",
    employeeId: "EMP001",
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: 102,
    username: "sarah.verification",
    email: "sarah.verification@coinnect.com",
    fullName: "Sarah Johnson",
    department: "Payment Verification",
    employeeId: "EMP002",
    createdAt: "2024-03-12T11:15:00Z",
  },
  {
    id: 103,
    username: "mike.support",
    email: "mike.support@coinnect.com",
    fullName: "Mike Wilson",
    department: "Customer Support",
    employeeId: "EMP003",
    createdAt: "2024-03-15T14:30:00Z",
  },
];

export default function AdminEmployeeManagement() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState(employees);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteEmployee = (employeeId) => {
    setEmployeeList(employeeList.filter((emp) => emp.id !== employeeId));
    console.log("Deleted employee:", employeeId);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem", color: "#fff" }}>
        <div style={headerStyle}>
          <div style={headerContent}>
            <div style={titleSection}>
              <Users size={32} style={{ marginRight: "1rem" }} />
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                  Employee Management
                </h1>
                <p style={{ color: "#bbb", margin: 0 }}>
                  Manage all employee accounts and permissions
                </p>
              </div>
            </div>
            <button
              style={primaryButton}
              onClick={() => navigate("/admin/create-employee")}
            >
              <UserPlus size={20} style={{ marginRight: "0.5rem" }} />
              Add Employee
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={searchContainer}>
          <div style={searchBox}>
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search employees by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInput}
            />
          </div>
        </div>

        {/* Employees Table */}
        <div style={tableContainer}>
          <div style={tableHeader}>
            <div style={tableRow}>
              <div style={{ ...tableCell, flex: 2 }}>Employee</div>
              <div style={tableCell}>Department</div>
              <div style={tableCell}>Employee ID</div>
              <div style={tableCell}>Actions</div>
            </div>
          </div>

          <div style={tableBody}>
            {filteredEmployees.map((employee) => (
              <div key={employee.id} style={tableRow}>
                <div style={{ ...tableCell, flex: 2 }}>
                  <p style={{ fontWeight: "600", margin: 0 }}>
                    {employee.fullName}
                  </p>
                  <p style={{ color: "#888", fontSize: "0.875rem", margin: 0 }}>
                    {employee.email}
                  </p>
                </div>
                <div style={tableCell}>{employee.department}</div>
                <div style={tableCell}>{employee.employeeId}</div>
                <div style={{ ...tableCell, gap: "0.5rem", display: "flex" }}>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    style={deleteButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredEmployees.length === 0 && (
          <div style={emptyState}>
            <Users size={48} color="#666" />
            <h3 style={{ color: "#fff", margin: "1rem 0 0.5rem 0" }}>
              No employees found
            </h3>
            <p style={{ color: "#888", margin: 0 }}>
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by adding your first employee"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const headerStyle = {
  background: "#2a2a2a",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  marginBottom: "1.5rem",
};

const headerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const titleSection = {
  display: "flex",
  alignItems: "center",
};

const primaryButton = {
  display: "flex",
  alignItems: "center",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const searchContainer = {
  marginBottom: "1.5rem",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  background: "#2a2a2a",
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
  border: "1px solid #374151",
};

const searchInput = {
  flex: 1,
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "1rem",
  marginLeft: "0.5rem",
  outline: "none",
};

const tableContainer = {
  background: "#2a2a2a",
  borderRadius: "0.75rem",
  overflow: "hidden",
};

const tableHeader = {
  background: "#374151",
};

const tableRow = {
  display: "flex",
  alignItems: "center",
  padding: "1rem 1.5rem",
  borderBottom: "1px solid #374151",
};

const tableCell = {
  flex: 1,
  padding: "0 0.5rem",
};

const tableBody = {
  background: "#2a2a2a",
};

const deleteButton = {
  background: "transparent",
  border: "none",
  color: "#f87171",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: "0.375rem",
  transition: "background-color 0.2s",
};

const emptyState = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "4rem 2rem",
  background: "#2a2a2a",
  borderRadius: "0.75rem",
  textAlign: "center",
};
