import React, { useContext } from 'react'
import logo from '../imges/blog-logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import bell from '../assets/bell.svg'

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div className='navbar'>
      <div className="container">
      
        <div className="logo">
          <Link to="/">
            <img src={logo} className='logo' />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to='/?cat=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?cat=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?cat=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?cat=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?cat=food'>
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser? <span onClick={logout}>logout</span> : <Link to="/login">Login</Link>}
          <span className='write'>
            <Link className='link' to='/write'>Write</Link>
          </span>
          {currentUser &&
          <span className='bell-icon'>
            <img src={bell} alt="Your SVG" />
            {/* <span className="notification-dot"></span> */}
          </span>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar