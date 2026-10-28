import React, { useState } from 'react'
import Header from './Header'
import axios from 'axios'

export default function Weather() {
    let[w,setw]=useState({
        name:"",
    });
    let[p,setp]=useState("");
    let[load,setload]=useState(false);
    let getvalue = (event)=>{
 let old={...w}
 let inputname=event.target.name;
    let inputvalue=event.target.value;
    old[inputname]=inputvalue;
     setw(old)
    
    setp("")}
    let getapi=()=>{
        setload(true);
         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${w.name}&appid=c3b0228f0c0adce3bf3170e646b2d2e8&units=metric`)
         .then((res)=>
            res.data
        
         
         ).then((finaldata)=>{
         console.log(finaldata);  
            console.log(finaldata.main);
            setp(finaldata.main);
            setw({
                name:"",
            })
            setload(false);
         }).catch((v)=>
            {
                alert("no data found")
            }
         )    
        }

  return (
    <>
    <div className='w1'>
        <Header/>
    
    <div className='w12'>
        <h1>Check Weather</h1>
        <div className='in'>

        <input type="text" placeholder='Enter City Name' name='name' onChange={getvalue} value={w.name}/><button onClick={getapi}>Check</button>
        </div>
    </div>
     <div className="showw">
{(p=="")
?(
    <h1>No data</h1>
):(
    <div className='t12'>
       

        <div className='di1'>

       <h1>Temperature</h1>
       <h2>{p.temp} degree</h2>
       <h3>Feels Like : {p.feels_like
}degree</h3>
        </div>
        </div>
)}
     </div>
    </div>
    </>
  )
}
