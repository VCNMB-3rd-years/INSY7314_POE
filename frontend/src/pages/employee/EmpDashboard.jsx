import { Navigate, useNavigate } from  "react-router-dom"

export default function VerifySwift() {
    const navigate = useNavigate()
    const viewTransactions = () => {
        navigate("/viewTransactions")
    }

    return(
        <div>
            <h1>Employee Dashboard</h1>
            <button onClick={viewTransactions}>View All Transactions</button>
        </div>
    )
}