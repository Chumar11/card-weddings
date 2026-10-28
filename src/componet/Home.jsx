import React, { useState } from 'react'
import Header from './Header';
export default function Home() {

  let[count,setcount]=useState("");
  let[coun,setcoun]=useState(false);
let increment =()=>{
let con = ++count;
if(!count==0)
setcount(con);
}
let decrement =()=>{
  if (!count ==""){

    let con = --count;
    setcount(con);
  }
}

  
  if(coun){
   
    setTimeout(()=>{
      let con = ++count;
if(!count==0)
setcount(con);


    },1000)
  }
 


  return (
    <div>     
      <Header/>

      <div className="counter">
        <div className="input">

        <input type="text" readOnly placeholder='counter' name='counter' value={count} />
        <button onClick={()=>{setcount("")}}>Reset</button>
        </div>

        <div className="bttn1">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={()=>setcoun(!coun)}>counter</button>
    
        </div>
      </div>
    </div>
  )
}
