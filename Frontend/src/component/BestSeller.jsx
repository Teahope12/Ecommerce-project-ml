import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Product from './Productdisplay';

function BestSeller() {
    const {products}=useContext(ShopContext);
    const [BestSeller, setBestSeller] = useState([]);
    useEffect(() => {
        const bestSellerProducts=products.filter(product=>product.bestSeller===true);
        setBestSeller(bestSellerProducts)
    }, [products]);
    
  return (
    <>
    <div>
       <h1 className='text-center w-full text-red-800 font-semibold text-3xl font-serif italic pt-9 pb-2'>Best Seller</h1>
       <p className='text-center pb-8 text-green-900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, asi deleniti ratione eaque quae hic? Repellat dolore tempore.
       </p>
    </div>
    <div className=' flex flex-wrap flex-row justify-center '>
        {
            BestSeller.map(product=><Product key={product._id} id={product._id} name={product.name} price={product.price}/>)
            
      
        }

    </div>
    </>
  )
}

export default BestSeller
