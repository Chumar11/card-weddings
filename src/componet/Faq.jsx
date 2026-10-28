import React, { useState,useEffect } from 'react'
import Header from './Header'
import axios from 'axios';


export default function Faq() {
  let[cate,setcate]=useState([]);
  let[pro,setpro]=useState([]);
  let[name,setname]=useState("");
  let[clas,setclas]=useState(false);
  let[load,setload]=useState(false);
let category = ()=>{
  axios.get('https://dummyjson.com/products/categories')
  .then((res)=>res.data)
  .then((final)=>{
setcate(final);
  })
}
useEffect(()=>{
  category();
},[]);

let catee=cate.slice(0,9).map((res)=>{
  return(
    <ul key={res}>
      <li className='r12' onClick={()=>{
        setname(res);
        setclas(!clas);
        setpro([])
      }}>{res}</li>
    </ul>
  )
})
useEffect(()=>{
  if(name !== ""){
    setload(true);
    axios.get(`https://dummyjson.com/products/category/${name}`)
    .then((res)=>res.data)
    .then((final)=>{
      setload(false)
      setpro(final.products);
    })
  }
},[name])

let pro1=pro.map((v)=>{
  return(
    <Product pro={v}/>
  )
})

  return (
    <div><Header/>
    <div
    className='e1'>

    <h1>Information Card</h1>

    </div>
    <div className="e123">
      <div className="letfcol">

{catee}

      </div>
      <div className={`rightcol ${clas ? 'visible' : 'hidden'}`}>
        <img src="https://i.gifer.com/ZKZg.gif" alt=""  className={`${load?"imm":"im"}`}/>
      {pro1}
      </div>
    </div>
    
    </div>
  )
}

  
function Product ({pro}) {
  // console.log(pdat);
  return (
    <div>
    <div className='t1'>
      <img className='imgg' src={pro?.thumbnail} alt={pro?.title}></img>
      <h4 className='text-[30px] text-[blue] p-[5px]' >{pro.title}</h4>
      <b className='text-[green]'>{pro.price}$</b>
    </div>
    </div>
  );
}