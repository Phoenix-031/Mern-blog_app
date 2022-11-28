import React from 'react'
import './topbar.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Topbar = () => {

  const {user,dispatch} = useContext(Context)
  const prof = 'https://blogappbackend-e4vv.onrender.com/images/'

  const handlelogout = ()=>{
    dispatch({type:"LOGOUT"})
  }
  
  return (
    <div className='top'>
        <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem"><Link to="/" style={{textDecoration:"none",color:"inherit"}}>HOME</Link></li>
                <li className="topListItem"><Link to="/" style={{textDecoration:"none",color:"inherit"}}>ABOUT</Link></li>
                <li className="topListItem"><Link to="/" style={{textDecoration:"none",color:"inherit"}}>CONTACT</Link></li>
                <li className="topListItem"><Link to="/write" style={{textDecoration:"none",color:"inherit"}}>WRITE</Link></li>
                <li className="topListItem"><Link to="/" style={{textDecoration:"none",color:"inherit"}} onClick = {handlelogout}>{user && "LOGOUT"}</Link></li>
            </ul>
        </div>
        <div className="topRight">
          {
            user ? (<Link to='/settings'><img className="topImg" src={user.others.profilePic ? prof + user.others.profilePic : prof + 'defmanprof.png'} alt="profile" /></Link>) :
            (
              <ul className='topList'>
                <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>LOGIN</Link>
                <Link to="/register" style={{textDecoration:"none",color:"inherit"}}>REGISTER</Link>
              </ul>
            )
          }
            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Topbar