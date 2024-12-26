import React from 'react'
import "./components_css/NavBar.css";

const NavBar = () => {
  return (
    <nav className='nav'>
        <h1>
            The Journal App
        </h1>
        <div className='links'>
            <a href="/">Home</a>
            <a href="/create" style = {{
                color : 'white',
                backgroundColor: 'blue',
                borderRadius: '8px'
            }}>Create New Entry</a>
            <a href="/logoff">Sign out</a>
        </div>
    </nav>
  )
}

export default NavBar