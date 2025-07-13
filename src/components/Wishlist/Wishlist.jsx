import React, { useContext } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Helmet from 'react-helmet';
export default function Wishlist() {
  const { wishlistItems, removeFromWishlist,addToWishlist } = useContext(WishListContext);
   let{addToCart}= useContext(CartContext)
  
  const navigate = useNavigate();

   async function handleAddToCart(prodId){
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

  async function handleDelete(prodId) {
    const response = await removeFromWishlist(prodId);
    if (response?.data?.status === 'success') {
      toast.success('Product removed from wishlist');
    } else {
      toast.error('Something went wrong');
    }
  }

  return (
    <>
    
        <Helmet>
           <title>wish list component</title>
         </Helmet>
      {wishlistItems && wishlistItems.length > 0 ? (
              <div className="w-full px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto my-10 ">

          
          <table className="w-full text-sm text-left bg-slate-100 rounded-3xl">
           <h2 className='px-6 py-4 text-3xl font-bold'>My Wish List </h2>
            <tbody>
              {wishlistItems.map((prod) => (
               <tr  className="border-b border-gray-300">
          
              <td className="py-6">
          
                  <img   src={prod.imageCover} alt={prod.title} className="w-16 md:w-24 ms-6" />
              </td> 
              <td className=" text-2xl font-semibold text-gray-800 ">
                  <span className="text-lg font-semibold">{prod.title}</span>
                 <div className=" py-1 text-lg text-gray-800 ">{prod?.price}EGP</div>

                 <div >
          
                   <a onClick={()=> handleDelete(prod._id)} className="cursor-pointer text-sm text-red-700 ps-1">
                   <i className='fa fa-trash  text-red-700'></i> Remove </a>

                 </div>
              </td>
              <td className='pe-3'> <button onClick={()=>{handleAddToCart(prod._id)}}  className="cursor-pointer my-10 flex items-center justify-center p-4 mx-auto text-sm font-medium  border border-green-600 rounded-lg" type="button"> add To Cart</button></td>
        
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container bg-slate-100 rounded-2xl mt-10 py-10 ps-10 text-3xl font-semibold">
          <h2>Wishlist</h2>
          <h2>Your Wishlist is Empty</h2>
        </div>
      )}
    </>
  );
}
