import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Singlep from '../../components/Singlepost/Singlep'
import './single.css'

const Single = () => {
  return (
    <div className='single'>
        <Singlep/>
        <Sidebar/>
    </div>
  )
}

export default Single