import React, { use, useContext, useEffect, useState } from 'react'
import style from './Productsdetail.module.css'
import Slider from "react-slick";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function Productsdetail() {
    const [counter , setcounter]= useState(0)
    let {addToCart}= useContext(CartContext)

  async function addProdToCart(prodId){
   let response= await addToCart(prodId)
   console.log(response);
   if(response?.data?.status==='success'){
    toast.success(response?.data?.message, {
  duration: 4000,
  position: 'top-right', 
  style: {
    background: '#16a34a', 
    color: 'white',
    fontWeight: '500',
    padding: '12px 16px',
    borderRadius: '8px',
  },
});
    } else {
     toast.error('error........')
    }
   
   }
 var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    let {id}=useParams()
    const [productdetails,setproductDetails]=useState(null)

  function getProductDetail(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
     console.log(data?.data);
     setproductDetails(data?.data)
    }).catch((error)=>{
      console.log(error)
    })
  }


    useEffect(()=>{
getProductDetail()
    },[])
  return<>
  {productdetails? <div className='flex flex-wrap px-30 pt-20 items-center'>
    <div className='w-full md:w-1/4'>
    <Slider {...settings}>
     {productdetails?.images.map((src)=>{return     <img className='w-full' src={src} alt={productdetails?.title}/>
 })}

    </Slider>
    </div>
    <div className='w-full md:w-3/4 ps-6'>
     <div>
      <h3 className='text-2xl font-black'>{productdetails?.title}</h3>
      <p className='text-slate-600 my-2'>{productdetails?.description}</p>
      <span className='text-green-500 text-xl '>{productdetails?.category?.name}</span>
      <div className='flex justify-between py-5'>
          <span>{productdetails?.price} EGP</span>
          <span>{productdetails?.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
        </div>
        <div>
          <button
                 onClick={() => addProdToCart(productdetails?._id)}
                 className=" bg-green-600 text-white py-2 px-4 rounded-md w-3/4 cursor-pointer" > + Add</button>
                <i className='fa fa-heart text-green-900 text-2xl ms-20'></i>
        </div>

     </div>
    </div>
  </div> :<Spinner/>} 
 
  </>
}
