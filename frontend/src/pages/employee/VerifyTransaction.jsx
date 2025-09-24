import { useNavigate } from "react-router-dom";
import BankNavbar from "../../components/BankNavbar";

export default function VerifyTransaction() {
  const navigate = useNavigate();

  const backToDash = () => {
    navigate("/empDashboard");
  };

  return (
    <>
      <BankNavbar userType="employee" />
      <div className="page-container" style={{ padding: "2rem" }}>
        <h1>Verify Transaction</h1>
        <p>
          Enter the SWIFT code or transaction details below to verify its
          authenticity.
        </p>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "350px",
            gap: "1rem",
          }}
        >
          <input type="text" placeholder="SWIFT Code" required />
          <button type="submit">Verify</button>
        </form>
        <button style={{ marginTop: "2rem" }} onClick={backToDash}>
          Back to Dashboard
        </button>
      </div>
    </>
  );
}
