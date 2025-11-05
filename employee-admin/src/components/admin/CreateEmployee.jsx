// src/components/admin/CreateEmployee.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { UserPlus, ArrowLeft } from "lucide-react";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    department: "",
    employeeId: "",
    position: "",
    salary: "",
  });

  const departments = [
    "Payment Processing",
    "Payment Verification",
    "Customer Support",
    "IT & Infrastructure",
    "Finance & Accounting",
    "Human Resources",
    "Management",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: API call to create employee
    console.log("Creating employee:", formData);
    // Navigate back to employee management
    navigate("/admin/employees");
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
        {/* Header */}
        <div style={headerStyle}>
          <div style={headerContent}>
            <div style={titleSection}>
              <button
                onClick={() => navigate("/admin/employees")}
                style={backButton}
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                  Create Employee
                </h1>
                <p style={{ color: "#bbb", margin: 0 }}>
                  Add a new employee to the system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={formContainer}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formGrid}>
              <div style={formGroup}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter full name"
                />
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter email address"
                />
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter username"
                />
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Employee ID *</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter employee ID"
                />
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter job position"
                />
              </div>

              <div style={formGroup}>
                <label style={labelStyle}>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Enter salary"
                />
              </div>
            </div>

            <div style={formActions}>
              <button
                type="button"
                onClick={() => navigate("/admin/employees")}
                style={secondaryButton}
              >
                Cancel
              </button>
              <button type="submit" style={primaryButton}>
                <UserPlus size={20} style={{ marginRight: "0.5rem" }} />
                Create Employee
              </button>
            </div>
          </form>
        </div>
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
  gap: "1rem",
};

const backButton = {
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  padding: "0.5rem",
  borderRadius: "0.375rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formContainer = {
  background: "#2a2a2a",
  borderRadius: "0.75rem",
  padding: "2rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "1.5rem",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const labelStyle = {
  fontWeight: "500",
  color: "#e5e7eb",
  fontSize: "0.875rem",
};

const inputStyle = {
  background: "#374151",
  border: "1px solid #4b5563",
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
  color: "white",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const formActions = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  paddingTop: "1rem",
  borderTop: "1px solid #374151",
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

const secondaryButton = {
  background: "transparent",
  color: "#9ca3af",
  border: "1px solid #4b5563",
  borderRadius: "0.5rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
};
