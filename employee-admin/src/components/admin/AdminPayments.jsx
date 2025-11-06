// src/components/admin/AdminPayments.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import {
  FolderOpen,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Demo payment data
const payments = [
  {
    id: "PAY001",
    amount: 1250.0,
    currency: "USD",
    customer: "John Smith",
    customerEmail: "john.smith@email.com",
    status: "completed",
    method: "Bank Transfer",
    date: "2024-03-20T10:30:00Z",
    processedBy: "john.payment",
    employeeName: "John Smith",
  },
  {
    id: "PAY002",
    amount: 850.5,
    currency: "EUR",
    customer: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    status: "pending",
    method: "Credit Card",
    date: "2024-03-20T09:15:00Z",
    processedBy: "sarah.verification",
    employeeName: "Sarah Johnson",
  },
  {
    id: "PAY003",
    amount: 3200.75,
    currency: "USD",
    customer: "Mike Wilson",
    customerEmail: "mike.wilson@email.com",
    status: "failed",
    method: "Crypto",
    date: "2024-03-19T16:45:00Z",
    processedBy: "john.payment",
    employeeName: "John Smith",
  },
  {
    id: "PAY004",
    amount: 450.0,
    currency: "GBP",
    customer: "Emma Davis",
    customerEmail: "emma.davis@email.com",
    status: "completed",
    method: "PayPal",
    date: "2024-03-19T14:20:00Z",
    processedBy: "sarah.verification",
    employeeName: "Sarah Johnson",
  },
  {
    id: "PAY005",
    amount: 1200.0,
    currency: "USD",
    customer: "Robert Brown",
    customerEmail: "robert.b@email.com",
    status: "pending",
    method: "Bank Transfer",
    date: "2024-03-19T11:10:00Z",
    processedBy: "john.payment",
    employeeName: "John Smith",
  },
];

export default function AdminPayments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "failed":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return { background: "#065f46", color: "#34d399" };
      case "pending":
        return { background: "#92400e", color: "#fbbf24" };
      case "failed":
        return { background: "#7f1d1d", color: "#f87171" };
      default:
        return { background: "#374151", color: "#9ca3af" };
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalAmount = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const completedAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0);

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
              <FolderOpen size={32} style={{ marginRight: "1rem" }} />
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                  Payment Management
                </h1>
                <p style={{ color: "#bbb", margin: 0 }}>
                  Monitor and manage all payment transactions
                </p>
              </div>
            </div>
            <button style={exportButton}>
              <Download size={20} style={{ marginRight: "0.5rem" }} />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={statsContainer}>
          <div style={statCard}>
            <div style={statContent}>
              <h3 style={statValue}>{filteredPayments.length}</h3>
              <p style={statLabel}>Total Transactions</p>
            </div>
          </div>
          <div style={statCard}>
            <div style={statContent}>
              <h3 style={statValue}>{formatCurrency(totalAmount, "USD")}</h3>
              <p style={statLabel}>Total Volume</p>
            </div>
          </div>
          <div style={statCard}>
            <div style={statContent}>
              <h3 style={statValue}>
                {formatCurrency(completedAmount, "USD")}
              </h3>
              <p style={statLabel}>Completed Volume</p>
            </div>
          </div>
          <div style={statCard}>
            <div style={statContent}>
              <h3 style={statValue}>
                {(
                  (filteredPayments.filter((p) => p.status === "completed")
                    .length /
                    filteredPayments.length) *
                    100 || 0
                ).toFixed(1)}
                %
              </h3>
              <p style={statLabel}>Success Rate</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={filtersContainer}>
          <div style={searchBox}>
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search payments by ID, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInput}
            />
          </div>
          <div style={filterGroup}>
            <Filter size={16} style={{ marginRight: "0.5rem" }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={filterSelect}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <div style={tableContainer}>
          <div style={tableHeader}>
            <div style={tableRow}>
              <div style={{ ...tableCell, flex: 1 }}>Payment ID</div>
              <div style={{ ...tableCell, flex: 1.2 }}>Customer</div>
              <div style={tableCell}>Amount</div>
              <div style={tableCell}>Method</div>
              <div style={tableCell}>Status</div>
              <div style={tableCell}>Date</div>
              <div style={tableCell}>Processed By</div>
            </div>
          </div>

          <div style={tableBody}>
            {filteredPayments.map((payment) => {
              const statusStyle = getStatusColor(payment.status);
              return (
                <div key={payment.id} style={tableRow}>
                  <div style={{ ...tableCell, flex: 1, fontWeight: "600" }}>
                    {payment.id}
                  </div>
                  <div style={{ ...tableCell, flex: 1.2 }}>
                    <p style={{ fontWeight: "500", margin: 0 }}>
                      {payment.customer}
                    </p>
                  </div>
                  <div style={tableCell}>
                    <p style={{ fontWeight: "600", margin: 0 }}>
                      {formatCurrency(payment.amount, payment.currency)}
                    </p>
                  </div>
                  <div style={tableCell}>{payment.method}</div>
                  <div style={tableCell}>
                    <span
                      style={{
                        ...statusBadge,
                        background: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                  <div style={tableCell}>{formatDate(payment.date)}</div>
                  <div style={tableCell}>
                    <p style={{ margin: 0 }}>{payment.employeeName}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredPayments.length === 0 && (
          <div style={emptyState}>
            <FolderOpen size={48} color="#666" />
            <h3 style={{ color: "#fff", margin: "1rem 0 0.5rem 0" }}>
              No payments found
            </h3>
            <p style={{ color: "#888", margin: 0 }}>
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No payment transactions available"}
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

const exportButton = {
  display: "flex",
  alignItems: "center",
  background: "transparent",
  color: "#60a5fa",
  border: "1px solid #60a5fa",
  borderRadius: "0.5rem",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.2s",
};

const statsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const statCard = {
  background: "#2a2a2a",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  border: "1px solid #374151",
};

const statContent = {
  textAlign: "center",
};

const statValue = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: "0 0 0.5rem 0",
  color: "#fff",
};

const statLabel = {
  color: "#9ca3af",
  margin: 0,
  fontSize: "0.875rem",
};

const filtersContainer = {
  display: "flex",
  gap: "1rem",
  marginBottom: "1.5rem",
  alignItems: "center",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  background: "#2a2a2a",
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
  border: "1px solid #374151",
  flex: 1,
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

const filterGroup = {
  display: "flex",
  alignItems: "center",
  background: "#2a2a2a",
  borderRadius: "0.5rem",
  padding: "0.75rem 1rem",
  border: "1px solid #374151",
  color: "#9ca3af",
};

const filterSelect = {
  background: "transparent",
  border: "none",
  color: "white",
  outline: "none",
  cursor: "pointer",
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
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

const tableBody = {
  background: "#2a2a2a",
};

const statusBadge = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.375rem 0.75rem",
  borderRadius: "9999px",
  fontSize: "0.75rem",
  fontWeight: "600",
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
