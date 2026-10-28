import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
     
      <nav className='navbar'>
        <ul>
          <li><Link to={'/'} >Home</Link></li>
          <li><Link to={'/Blog'} >Blog</Link></li>
          <li><Link to={'/Faq'} >Faq</Link></li>
          <li><Link to={'/Form'} >Form</Link></li>
          <li><Link to={'/Cart'} >Cart</Link></li>
          <li><Link to={'/Weather'} >Weather</Link></li>
        </ul>
      </nav>
    </header>
  );
}
