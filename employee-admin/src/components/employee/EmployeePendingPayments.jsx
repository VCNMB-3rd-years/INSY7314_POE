// src/components/employee/EmployeePendingPayments.jsx
import { useState } from "react";
import Sidebar from "../Sidebar";
import { CheckCircle, XCircle, Eye } from "lucide-react";

// Demo data for pending payments
const pendingPayments = [
  {
    id: 1001,
    customerName: "Alice Johnson",
    accountNumber: "ACC123456789",
    amount: 1500.0,
    currency: "USD",
    recipientBank: "Bank of America",
    recipientAccount: "BOA987654321",
    swiftCode: "BOFAUS3N",
    submittedAt: "2024-11-05T09:15:00Z",
  },
  {
    id: 1002,
    customerName: "Bob Wilson",
    accountNumber: "ACC234567890",
    amount: 2750.5,
    currency: "EUR",
    recipientBank: "Deutsche Bank",
    recipientAccount: "DEUTDEFF789",
    swiftCode: "DEUTDEFF",
    submittedAt: "2024-11-05T10:30:00Z",
  },
  {
    id: 1003,
    customerName: "Carol Davis",
    accountNumber: "ACC345678901",
    amount: 500.0,
    currency: "GBP",
    recipientBank: "Barclays Bank",
    recipientAccount: "BARCGB22XXX",
    swiftCode: "BARCGB22",
    submittedAt: "2024-11-05T11:45:00Z",
  },
];

export default function EmployeePendingPayments() {
  const [payments, setPayments] = useState(pendingPayments);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const approvePayment = (paymentId) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
    console.log("Approved payment:", paymentId);
  };

  const denyPayment = (paymentId) => {
    setPayments(payments.filter((payment) => payment.id !== paymentId));
    console.log("Denied payment:", paymentId);
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
      <div style={{ flex: 1, padding: "3rem 2rem", color: "#fff" }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pending Payments</h1>
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {payments.length} pending
          </span>
        </div>

        <div className="space-y-4">
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Pending Payments
              </h3>
              <p className="text-gray-400">All payments have been processed.</p>
            </div>
          ) : (
            payments.map((payment) => (
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
                      Account: {payment.accountNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">
                      {payment.amount} {payment.currency}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(payment.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Recipient Bank:</span>
                    <p>{payment.recipientBank}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">SWIFT Code:</span>
                    <p>{payment.swiftCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Recipient Account:</span>
                    <p>{payment.recipientAccount}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => approvePayment(payment.id)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => denyPayment(payment.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <XCircle size={18} />
                    Deny
                  </button>
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Eye size={18} />
                    Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
