import React from 'react'
import { useState } from 'react'
import './write.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Write = () => {


    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [file,setFile] = useState(null)
    const {user} = useContext(Context)

    const handlePublish = async(e)=>{
        
        e.preventDefault()

        const post = {
            title,
            description,
            username:user.others.username
        }

        if(file){
            const data =new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename)
            data.append("file",file)
            post.photo = filename
            try{

                await axios.post('https://blogappbackend-e4vv.onrender.com/api/upload',data)
                
            }catch(err){
                console.log(err)
            }
        }

        try{

            const result =await axios.post('https://blogappbackend-e4vv.onrender.com/api/posts',post)
            console.log(result)
            window.location.replace(`/post/${result.data.savedpost._id}`)
            
        }catch(err){
            console.log(err)
        }
        
        
    }
    
    
  return (
    <div className='write'>
        {file && (<img src={URL.createObjectURL(file)} alt="" className='writeImage' />)}
        <form className='writeForm'>
            <div className="writeFormGroup">
                <input type="file" id= "fileInput" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-circle-plus"></i>
                </label>
                <input type="text" placeholder='title' className='writeInput' autoFocus={true} onChange = {(e)=>{setTitle(e.target.value)}} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Write your heart out...' type="text" className='writeInput writeText' rows="20" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            </div>
            <button className='writeSubmit' onClick={handlePublish}>Publish</button>
        </form>
    </div>
  )
}

export default Write