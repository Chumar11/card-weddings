import React from 'react'
import { Link } from 'react-router-dom';
export default function Blogbox({value}) {
    let para =value.body.slice(0,150);
    let tittle = value.title.slice(0,20);
  return (
    <div className='Blogbox'>
        <h4>{tittle}</h4>
        <p className='para'>{para}</p>
        <button className='btn'><Link to={`/blog/${value.id}`}>Read More</Link></button>
    </div>
  )
}
