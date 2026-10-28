import React, { useState } from 'react'
import Header from './Header'

export default function Form() {
  let[vall,setvall]=useState({
    Uname:"",
    email:"",
    number:"",
    password:"",
  })
  let getvalue = (event)=>{
    let olddata = {...vall};
    let inputname=event.target.name;
    let inputvalue=event.target.value;
    olddata[inputname]=inputvalue;
    setvall(olddata);

  }
  let sub = (event)=>{
    if(!vall.email.endsWith("@gmail.com"))
      {
        alert(" Check email format ")
        
      }else{

        setvall({
          Uname:"",
          email:"",
          number:"",
          password:"",
        })
      }
      event.preventDefault();
    }
  console.log(vall);
  return (
    <div><Header/>
    <div
    className='form'>
      <form action="" onSubmit={sub}>
      <label htmlFor="">Username:</label> <input type="text" name='Uname' placeholder='Enter Name' onChange={getvalue} value={vall.Uname}/>
      <label htmlFor="">E-mail:</label>  <input type="text" name='email' placeholder='Enter Email' onChange={getvalue} value={vall.email}/>
       <label htmlFor=""> Ph-no:</label> <input type="num" name='number' placeholder='Enter Number' onChange={getvalue} value={vall.number}/>
        <label htmlFor="">Password</label><input type="password" name='password' placeholder='Enter Password' onChange={getvalue} value={vall.password}/>
        <button type='submit'
        >Submit</button>
      </form>
    </div>
    </div>
  )
}
