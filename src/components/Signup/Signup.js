import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="page">
            <div className="form">
                <form className='signup' onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
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
                        <button disabled={isLoading}>Sign Up</button>
                        <div className="log-in">
                            Already a User? <Link to="/login">Login</Link>
                            {error && <div className='error'>{error}</div>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup