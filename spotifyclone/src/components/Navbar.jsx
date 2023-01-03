import reactLogo from '../assets/react.svg'
import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <nav className='branding'><img src = {reactLogo} className='logo'/>
            <span>Spotify</span>
        </nav>
        <nav>Home</nav>
        <nav>About</nav>
    </div>
  );
}

export default Navbar