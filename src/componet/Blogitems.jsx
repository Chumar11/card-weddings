import React from 'react'
import Blogbox from './Blogbox'
import blogs from '../Data/BLogs'

export default function Blogitems() {
    let blog1= blogs.map((value,index)=>{
        return(
            <Blogbox value={value}/>
        )
    })
  return (
    <div className='e2'>{blog1}</div>
  )
}
