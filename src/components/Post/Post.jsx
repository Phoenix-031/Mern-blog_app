import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'

const Post = ({post}) => {
  
  const imagefol = 'https://thawing-woodland-42890.herokuapp.com/images/'
  
  return (
    <div className='post'>
       {post.photo && (
        <img className='postImg' src={imagefol+post.photo} alt="" />
       )}
       
        <div className="postInfo">
            <div className="postCats">
              {post.categories.map((item) =>{
                return <span className='postCat'>{item.name}</span>
              })}
            </div>
             <Link to={`/post/${post._id}`}><span className="postTitle">{post.title}</span></Link>
            <hr />
            <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='postDescription'>{post.description}</p>
    </div>
  )
}

export default Post