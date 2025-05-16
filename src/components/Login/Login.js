import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <div className="page">
            <div className="form">
                <form className='login' onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="components">
                        <label>Email:</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="links">
                        <button disabled={isLoading}>Login</button> <br></br>
                        <div className="sign-up">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login