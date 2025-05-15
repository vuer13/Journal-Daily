import React from 'react'
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import "./NavBar.css";

const NavBar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <nav className='nav'>
            <h1>
                The Journal App
            </h1>
            {user && (<div className='links'>
                <Link to="/">Home</Link>
                <Link to="/create" style={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '8px'
                }}>Create New Entry</Link>
                <button onClick={handleClick} style={{borderRadius: '8px'}}>
                    Logout
                </button>
            </div>)}
            {!user && (<div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>)}
        </nav>
    )
}

export default NavBar