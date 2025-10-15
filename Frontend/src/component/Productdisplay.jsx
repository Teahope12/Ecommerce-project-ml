import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

function Product({id, name, price}) {
  const [selectImage, setSelectImage] = useState(null);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    const product = products.find((item) => item._id == id);
    if (product) {
      console.log(product.images[0].url);
      
      
      setSelectImage(product.images[0].url);
    }
  }, [products]);
  return (
    <Link to={`/product/${id}`}>
        <div className='w-[15rem] h-[22rem] m-4 border-2 flex flex-col justify-between items-center overflow-hidden '>
            <img className='w-[15rem] h-64' src={selectImage} alt={name}/>
            <h3 className='font-serif font-semibold text-center  '>{name}</h3>
            <p className='pb-4'>${price}</p>
        </div>
        </Link>
  )
}

export default Product