import { Navigate, useNavigate } from  "react-router-dom"

export default function VerifySwift() {
    const navigate = useNavigate()
    const createTransaction = () => {
        navigate("/createTransaction")
    }
    const viewCustTransactions = () => {
        navigate("/custTransactions")
    }

    return(
        <div>
            <h1>Customer Dashboard</h1>
            <button onClick={createTransaction}>Create Transaction</button>
            <button onClick={viewCustTransactions}>View My Transactions</button>
        </div>
    )
}