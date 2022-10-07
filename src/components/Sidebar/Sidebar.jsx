import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import './sidebar.css'

const Sidebar = () => {
    const {user} = useContext(Context)
    console.log(user)


    const profie = 'https://thawing-woodland-42890.herokuapp.com/images/'

    // useEffect(()=>{

    // },[])
    
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <div className="img-container">
            
            <img src="https://i.pinimg.com/564x/b8/b9/28/b8b928e972a0adf39140a51872eccf36.jpg" alt="" />
            </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A placeat, tenetur architecto molestiae nihil .</p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                <li className="sidebarListItem">Music</li>
                <li className="sidebarListItem">Tech</li>
                <li className="sidebarListItem">Workout</li>
                <li className="sidebarListItem">Food</li>
                <li className="sidebarListItem">Sport</li>
                <li className="sidebarListItem">Cinema</li>
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
            </div>
        </div>
    </div>
  )
}

export default Sidebar