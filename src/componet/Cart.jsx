import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';

export default function Cart() {
    let [pro,setpro]=useState([]);
    let [cart, setCart] = useState([]);
    
    let produc=()=>{
        axios.get('https://dummyjson.com/products').then((res)=>res.data).then((finaldata)=>{
            setpro(finaldata.products)
        })
    }
    useEffect(()=>{
        produc();
    },[])
  
    
    let addtocart = (pro1) => {
        
        if(cart.includes(pro1)){
         
    //      q1=q1+1;
    //   let f=pro1.id/pro1.id;
    // let  p=f+q1;
         alert("you can add item only Once thanks");
          
        }else{
        setCart([...cart, pro1]);

    }
    };
 
    let remove = (e) => {
       
        let w = cart.filter((v)=>e.id!==v.id)
        setCart(w);
        console.log(e);
    };
    
  
    let p1 =pro.slice(0,9).map((v)=>{
        return(
        <Product pro1={v}  addtocart={addtocart} />
        )
    })
    let p2 = cart.map((v)=>{
        return(
            <li><div className='ct'><img src={v?.thumbnail} alt="" />
            <div className='ct1'><p>{v.title}</p>
            <h5>{v.price}$</h5>
            <p>quantity:{1}</p></div>
          <img onClick={()=>remove(v)} className="iig" src="https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png" alt="" /></div></li>
        )
    })
    const total = cart.reduce((sum, product) => sum + product.price, 0);
  return (
    <div><Header/>
    <div className="cart">
        <div className="pro">

{p1}



        </div>
        <div className="cartitems">
            <h1 className='cart-head'>CART-ITEMS</h1>
            <ul>
               {p2}
            </ul>
   <div className='total'><h1>Total <span>= {total}$</span></h1></div>

            
        </div>
    </div>
    </div>
  )
}

function Product ({pro1,addtocart}) {
    let addcart=(event)=>{
        let elements = document.querySelectorAll('.t1');
        elements.forEach((element, index) => {
            element.addEventListener('click', (event) => {
              let indexNo = index; 
           
            });
          });
    }
    return (
      <div>
      <div className='t1'>
        <img className='imgg' src={pro1?.thumbnail} alt={pro1?.title}></img>
        <h4 className='text-[30px] text-[blue] p-[5px]' >{pro1.title}</h4>
        <b className='text-[green]'>{pro1.price}$</b>
        <div>
        
        <button className='b1'>+</button> <button className='b2'>-</button>
        </div>
        <button className='cart-btn' onClick={()=>addtocart(pro1)}>Add TO Cart</button>
      </div>
      </div>
    );
  }