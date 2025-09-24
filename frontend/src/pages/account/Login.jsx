import { Navigate, useNavigate } from  "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    //the custlogin and emplogin wil combine to one handlelogin
    const handleCustLogin = () => {
        navigate("/custDashboard")
    }
    const handleEmpLogin = () =>{
        navigate("/empDashboard")
    }
    return(
        <div>
            <h1>Login Page</h1>
            <button onClick={handleCustLogin}>Login as customer</button>
            <button onClick={handleEmpLogin}>Login as employee</button>
        </div>
    )
}