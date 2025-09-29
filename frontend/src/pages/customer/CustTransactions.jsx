import { Navigate, useNavigate } from  "react-router-dom"

export default function Transactions() {
    const navigate = useNavigate()
    //this will allow a customer to view all their transactions by cust id
    const handleTransaction = () => {
        navigate("/viewTransactions")
    }
    const backToDash = () => {
        navigate("/custDashboard")
    }

    return(
        <div>
            <h1>View My Transactions</h1>
            <button onClick={backToDash}>Back to Dashboard</button>
        </div>
    )
}