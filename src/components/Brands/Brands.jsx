import React, { use, useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Helmet } from 'react-helmet'
export default function Brands() {
    const [allBrands , setAllBrands]= useState(null)


    async function getAllbrands(){
      axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(({data})=>{
        console.log(data.data);
        setAllBrands(data?.data)
      })
      .catch((error)=>{
        console.log(error)
      })
    }



    useEffect(()=>{
    getAllbrands()
    },[])
  return <>
  
          <Helmet>
             <title>brand component</title>
           </Helmet>
  
  <div><h2 className="text-4xl font-semibold text-green-700 mb-6 text-center pt-4">
          All Brands
          </h2></div>
  {/* <Link> */}
 {allBrands?<div className='flex flex-wrap py-6'>
  {allBrands?.map((brand) => (  
          
    <div  className='w-full md:w-1/4 p-3'>
      
          <div className='bg-white  shadow-lg hover:shadow-[0_0_20px_rgba(16,200,139,0.6)] transition-all duration-500 rounded-lg overflow-hidden ' >

      {/* <div className='bg-white  shadow-lg hover:shadow-[0_0_20px_rgba(16,200,139,0.6)] transition-all duration-300 rounded-lg overflow-hidden h-90' onClick={() =>
                setActiveCategoryId(
                  activeCategoryId === category._id ? null : category._id
                )
              }> */}
        <img src={brand.image} alt={brand.name} className='w-full  ' />
        <div className='p-4 text-center'>
          <span className=' text-xl '>{brand.name}</span>
        </div>
      </div>
        
   </div>
  ))}
   {/* {activeCategoryId !==null && (
        <div className="w-full mt-10  pt-6 mb-7">
          <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
          {activeCategory?.name}  Subcategories
          </h2>
          <Subcategories id={activeCategoryId}/>
        </div>
      )} */}
       
 </div>:<Spinner/>}

  

  {/* </Link>  */}
  </>
}
 


    


// function getBrands(){
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
// }

// let {data ,error , isError , isLoading , isFetching, }=useQuery({
//   queryKey:['brands'] ,
//   queryFn: getBrands
// })

// console.log(data?.data?.data)


    // useEffect(()=>{

    // },[])
    // if(isLoading){
    //   return <Spinner/>
    // }
  // return <>
  // <h2>brands</h2>
  // </>

