import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import blogs from '../Data/BLogs'
import { useParams } from 'react-router-dom';

function Blogdetails() {

  const { id } = useParams();

 let data = blogs.find((v)=>String(v.id) === String(id));
 if (!data) {
   return (
     <div>
       <Header />
       <h1>Blog not found</h1>
     </div>
   );
 }
  return (
    <div>
      <Header />
      <h1>{data.id}</h1>
      <h1>{data.title}</h1>
      <p>{data.body}</p>   
    </div>
  );
}

export default Blogdetails;