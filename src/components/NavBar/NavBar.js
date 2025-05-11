import React from 'react'
import { Link } from 'react-router-dom';
import {useLogout} from '../../hooks/useLogout'
import "./NavBar.css";

const NavBar = () => {

    const {logout} = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <nav className='nav'>
            <h1>
                The Journal App
            </h1>
            <div className='links'>
                <Link to="/">Home</Link>
                <Link to="/create" style={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderRadius: '8px'
                }}>Create New Entry</Link>
                <Link to="/login">Login</Link>
                <div>
                    <button onClick={handleClick}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar