import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import './home.css'
import { useLocation } from 'react-router-dom'


const Home = () => {

  const [posts,setPosts] = useState([])
  const {search} = useLocation()

  useEffect(()=>{

      const fetchPosts = async ()=>{
        const postResult = await axios.get('https://thawing-woodland-42890.herokuapp.com/api/posts' + search)
        setPosts(postResult.data.posts)
      }

      fetchPosts()
  },[search])

  return (
    <>
      <Header/>
    <div className='home'>
      <Posts posts = {posts}/>
      <Sidebar/>
    </div>
    </>
  )
}

export default Home
