import React from 'react'
import './register.css'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {

  const[username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[err,setErr] = useState(false)

  const handleclick = async(e)=>{
    e.preventDefault() 
    setErr(false)

    try{
      const register = await axios.post('https://thawing-woodland-42890.herokuapp.com/api/auth/register',{
        username,email,password
      })
      if(register.data.success){
        window.location.assign('/login')
      }
    }catch(err){
      setErr(true)
    }
  }
  
  return (
    <div className='register'>
        <span className='registerTitle'>Register</span>
        <form className="registerForm">
            <label htmlFor="">Username</label>
            <input type="text" placeholder='Enter Username' className='registerInput' value={username} onChange={(e) =>{setUsername(e.target.value)}}/>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Enter Email' className='registerInput' value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='Enter Password' className='registerInput' value={password} onChange={(e) =>{setPassword(e.target.value)}}/>

            <button className='registerButton' onClick={handleclick}>Register</button>
            <div className="not-container">
                <span>Already a member?</span>
                <button className='registerLoginButton'>
                <Link to="/login">Login</Link>
                </button>
                {err && <div style={{'color':'red','marginTop':'20'}}>Something went very wrong!!</div>}
            </div>
        </form>
    </div>
  )
}

export default Register