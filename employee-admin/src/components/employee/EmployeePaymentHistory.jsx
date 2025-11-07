// src/components/employee/EmployeePaymentHistory.jsx
import { useState } from "react";
import Sidebar from "../Sidebar";
import { CheckCircle, XCircle, Filter } from "lucide-react";

// Demo data for payment history
const paymentHistory = [
  {
    id: 1004,
    customerName: "David Miller",
    amount: 1200.75,
    currency: "USD",
    status: "approved",
    submittedAt: "2024-11-04T08:20:00Z",
    processedAt: "2024-11-04T10:15:00Z",
    processedBy: "john.payment",
  },
  {
    id: 1005,
    customerName: "Emma Garcia",
    amount: 3000.0,
    currency: "EUR",
    status: "approved",
    submittedAt: "2024-11-04T14:30:00Z",
    processedAt: "2024-11-04T16:45:00Z",
    processedBy: "sarah.verification",
  },
  {
    id: 1006,
    customerName: "Frank Thomas",
    amount: 4500.25,
    currency: "USD",
    status: "denied",
    submittedAt: "2024-11-03T13:10:00Z",
    processedAt: "2024-11-03T15:30:00Z",
    processedBy: "mike.review",
    reason: "Insufficient funds verification",
  },
];

export default function EmployeePaymentHistory() {
  const [filter, setFilter] = useState("all");

  const filteredPayments = paymentHistory.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

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
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Payment History</h1>
          <div className="flex items-center gap-2">
            <Filter size={20} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">All Payments</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {payment.customerName}
                  </h3>
                  <p className="text-gray-400">
                    Processed by: {payment.processedBy}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {payment.amount} {payment.currency}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                      payment.status === "approved"
                        ? "bg-green-900 text-green-300"
                        : "bg-red-900 text-red-300"
                    }`}
                  >
                    {payment.status === "approved" ? (
                      <CheckCircle size={14} />
                    ) : (
                      <XCircle size={14} />
                    )}
                    {payment.status.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Submitted:</span>
                  <p>{new Date(payment.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Processed:</span>
                  <p>{new Date(payment.processedAt).toLocaleString()}</p>
                </div>
                {payment.reason && (
                  <div className="col-span-2">
                    <span className="text-gray-400">Reason:</span>
                    <p className="text-red-300">{payment.reason}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
