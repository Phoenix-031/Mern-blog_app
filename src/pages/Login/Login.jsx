import React from 'react'
import './login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Login = () => {

  const userRef = useRef()
  const passwordRef = useRef()

  const {dispatch} = useContext(Context)


  const handleclick = async(e)=>{
    e.preventDefault() 

    dispatch({type:"LOGIN_START"})
    try{

      const result = await axios.post('https://thawing-woodland-42890.herokuapp.com/api/auth/login',{
        username:userRef.current.value,
        password:passwordRef.current.value        
      })

      console.log(result.data.success)
      if(result.data.success){
        dispatch({type:"LOGIN_SUCCESS",payload:result.data})
        window.location= '/'
      }
      else if(!result.data.success){
        if(result.data.msg === "No such user exists")
          window.alert("No such user")
      }
      
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  
  return (
    <div className='login'>
        <span className='loginTitle'>Login</span>
        <form className="loginForm">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Username' className='loginInput' ref={userRef}/>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='Password' className='loginInput' ref={passwordRef}/>

            <button className='loginButton'  onClick={handleclick}>Login</button>
            <div className="not-container">
                <span>Not a member?</span>
                <button className='loginRegisterButton'>
                    <Link to="/register">Register</Link>
                </button>
            </div>
        </form>
    </div>
  )
}

export default Login