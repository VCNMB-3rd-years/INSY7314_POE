import { Navigate, useNavigate } from  "react-router-dom"

export default function VerifySwift() {
    const navigate = useNavigate()
    //this will allow a emp to proceed with verifying a swift code
    const handleTransactions = () => {
        navigate("/verifyTransaction")
    }
    const backToDash = () => {
        navigate("/empDashboard")
    }

    return(
        <div>
            <h1>Verify Transaction</h1>
            <button onClick={backToDash}>Back to Dashboard</button>
        </div>
    )
}