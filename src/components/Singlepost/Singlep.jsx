import React from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import './singlep.css'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Singlep = () => {

    const imagefol = 'https://thawing-woodland-42890.herokuapp.com/images/'
    const {user} = useContext(Context)

    const location = useLocation()
    const postId = location.pathname.split('/')[2]

    const [postd,setPostd] = useState({})

    const [newtitle,setTitle] = useState('')
    const [newdescription,setDesc] = useState('')
    const [updateMode,setUpdateMode] = useState(false)
    
    useEffect(()=>{

        const post = async () =>{
            const postData = await axios.get(`https://thawing-woodland-42890.herokuapp.com/api/posts/${postId}`)
            console.log(postData)
            setPostd(postData.data.post)
            setTitle(postData.data.post.title)
            setDesc(postData.data.post.description)
        }
        
        post()
        
    },[postId])
    

    const handleUpdate = async()=>{
        try{
            await axios.put('https://thawing-woodland-42890.herokuapp.com/api/posts/'+postId,{
                username:user.others.username, 
                title:newtitle,
                description:newdescription
        })

            // window.location.reload()
            setUpdateMode(false)
            
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async()=>{
        try{
            const postdel = await axios.delete('https://thawing-woodland-42890.herokuapp.com/api/posts/' + postId,{data:{username:user.others.username}})
            window.location.replace('/')
            console.log(postdel)
        }catch(err){
            console.log(err)
        }
    }
    
    
  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {postd.photo && <img src={imagefol + postd.photo} alt="" className="singlePostImg" />}

           { updateMode ? (<input type="text" value={newtitle} className="singlePostTitleInput" autoFocus onChange={(e)=>{setTitle(e.target.value)}}/>) : (
            
            <h1 className="singlePostTitle"><span>{newtitle}</span>
            {postd.username === user?.others.username && (
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>{setUpdateMode(true)}}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
            )}
            </h1>
            )}

            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Author: <Link to={`/?user=${postd.username}`}><b>{postd.username}</b></Link></span>
                <span className='singlePostName'>{new Date(postd.createdAt).toDateString()}</span>
            </div>

            {updateMode ? <textarea className='singlePostDescInput' value={newdescription} rows='10' onChange = {(e)=> {setDesc(e.target.value)}}/> : (
                <div className='singlePostDesc'><p>{newdescription}</p></div>
                )}

            {updateMode && <button className='postUpdateButton' onClick={handleUpdate}>Update</button>}
        </div>

    </div>
  )
}

export default Singlep