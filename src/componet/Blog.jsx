import React from 'react'
import Blogitems from './Blogitems'
import Header from './Header';


export default function Blog() {
  return (
    <>
    <Header/>
    <div className='blog'>

      <Blogitems/>
    </div>
    </>
  )
}
