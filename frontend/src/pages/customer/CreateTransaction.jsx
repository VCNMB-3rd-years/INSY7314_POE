import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

export default function CreateTransaction() {
  const navigate = useNavigate();
  const backToDash = () => {
    navigate("/custDashboard");
  };

  return (
    <>
      <BankNavbar userType="customer" />
      <div className="page-container" style={{ padding: "2rem" }}>
        <h1>Create A Transaction</h1>
        <p>
          Fill in the details below to send money securely and instantly to
          another account.
        </p>
        {/* Example form fields */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            gap: "1rem",
          }}
        >
          <input type="text" placeholder="Recipient Account" required />
          <input type="number" placeholder="Amount" required />
          <input type="text" placeholder="Reference" />
          <button type="submit">Send Transaction</button>
        </form>
        <button style={{ marginTop: "2rem" }} onClick={backToDash}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
}
