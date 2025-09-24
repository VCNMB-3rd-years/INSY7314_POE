import { Navigate, useNavigate } from  "react-router-dom"

export default function VerifySwift() {
    const navigate = useNavigate()
    const backToDash = () => {
        navigate("/custDashboard")
    }

    return(
        <div>
            <h1>Create Transaction</h1>
            <button onClick={backToDash}>Back to Dashboard</button>
        </div>
    )
}