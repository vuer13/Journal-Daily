import React from 'react'
import {Link} from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className='nav'>
        <h1>
            The Journal App
        </h1>
        <div className='links'>
            <Link to="/">Home</Link>
            <Link to="/create" style = {{
                color : 'white',
                backgroundColor: 'blue',
                borderRadius: '8px'
            }}>Create New Entry</Link>
            <Link to="/logoff">Sign out</Link>
        </div>
    </nav>
  )
}

export default NavBar