import { Navigate, useNavigate } from  "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate("/login")
    }
    return(
        <div>
            <h1>Register Page</h1>
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}