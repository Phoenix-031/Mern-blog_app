import React, { useContext } from 'react'
import './settings.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Context } from '../../context/Context'
import axios from 'axios'
import { useState } from 'react'

const Settings = () => {

    const profile = 'https://blogappbackend-e4vv.onrender.com/images/'
    const {user,dispatch} = useContext(Context)
    const [username,setUsername] = useState(user.others.username)
    const [email,setEmail] = useState(user.others.email)
    const [password,setPassword] = useState('')
    const [file,setFile] = useState(null)

    const handlesubmit = async(e)=>{
        e.preventDefault()

        dispatch({type:"UPDATE_START"})

        let updatedUser

        if(password.length > 5 ){
             updatedUser = {
                userId:user.others._id,
                username,
                email,
                password
            }
            console.log("password updated")
        }else{
             updatedUser = {
                userId:user.others._id,
                username,
                email,
            }
        }
        

        if(file){
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename)
            data.append("file",file)
            updatedUser.profilePic = filename
            try{

                await axios.post('https://blogappbackend-e4vv.onrender.com/api/upload',data)
                
            }catch(err){
                console.log(err)
            }
        }

        try{

            // console.log(user.others._id)
            const result =await axios.patch('https://blogappbackend-e4vv.onrender.com/api/users/' + user.others._id,updatedUser)
            console.log(result)
            dispatch({type:"UPDATE_SUCCESS",payload:result.data})
            if(result.data.success){
                window.alert('profile has been updated')
            }
            
        }catch(err){
            dispatch({type:"UPDATE_FAILURE"})
            console.log(err)
        }

    }

    const delacc = async()=>{
        try{

            await axios.delete('https://blogappbackend-e4vv.onrender.com/api/users/' + user.others._id,{data:{
                userId:user.others._id
            }})
            window.localStorage.clear()
            window.location.replace('/')

            
        }catch(err){
            console.log(err)
        }
    }
    
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Account</span>
                <span className="settingsDeleteTitle" onClick={delacc}>Delete Account</span>
            </div>
            <form className="settingsForm">
                <label>Profile Picture</label>
                <div className="settingsPic">
                    {/* {file ?  URL.createObjectURL(file) : user.others.profilePic ? profile+user.others.profilePic : profile + 'defmanprof.png' } */}
                    {/* <img src={file ? URL.createObjectURL(file) : user?.others.profilePic} alt="" /> */}
                    <img src={file ?  URL.createObjectURL(file) : user.others.profilePic ? profile+user.others.profilePic : profile + 'defmanprof.png' } alt="" />
                    <label htmlFor="fileInput">
                    <i class="fa-solid fa-user PP"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>{setFile(e.target.files[0])}}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                <label>Email</label>
                <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type="text" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>

                <button className="settingsSubmit" onClick={handlesubmit}>Update</button>

            </form>
        </div>
        <Sidebar/>
    </div>
  )
}

export default Settings