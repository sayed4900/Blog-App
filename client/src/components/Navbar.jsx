import React, { useContext, useEffect, useState } from 'react'
import logo from '../imges/blog-logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import bell from '../assets/bell.svg'
import axios from 'axios'
import { baseUrl } from '../utils/service'

const Navbar = ({socket}) => {
  const {currentUser, logout} = useContext(AuthContext);
  const [redDot, SetDotRed] = useState(false);
  console.log(currentUser)

  useEffect(()=>{
    console.log(socket)
    socket?.on("sendNotifaction",(msg)=>{
        console.log(msg)
        SetDotRed(true)
      })
  },[])

  const removeredDot = ()=>{
    SetDotRed(false)
  }
  
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
          <Link to={`/${currentUser.user_id}/notifications`}>
            <span className='bell-icon' onClick={removeredDot}>
              <img src={bell} alt="" />
              {redDot&&<span className="notification-dot"></span>}
            </span>
          </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar