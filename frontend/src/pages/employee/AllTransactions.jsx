import { Navigate, useNavigate } from  "react-router-dom"

export default function Transaction() {
    const navigate = useNavigate()
    //this will allow an emp to view all transaction by id
    const handleTransactions = () => {
        navigate("/viewTransactions")
    }
    const backToDash = () => {
        navigate("/empDashboard")
    }
    const verifySwiftCode = () => {
        navigate("/verifyTransaction")
    }

    return(
        <div>
            <h1>View All Transactions</h1>
            <button onClick={backToDash}>Back to Dashboard</button>
            <button onClick={verifySwiftCode}>Verify Transaction</button>
        </div>
    )
}