import React from 'react'

function Hero() {
  return (
    <div className='justify-center  flex '>
        <div className=' w-fit md:w-full m-4 border-2 flex justify-between items-center '>
      
        <div className='w-fit flex flex-col  place-items-start items-center p-3 font-serif '>
            <h1 className='md:text-xl text-lg md:pl-4'>___Our BestSeller</h1>
            <p className='md:text-3xl text-xl md:font-bold font-semibold  md:pl-4'>Explore the world of fashion</p>
            <p className='md:text-xl text-lg md:pl-4'>Shop Now____</p>
        </div>
        <img src='../public/model.jpg' alt='model' className='md:w-[28rem] md:h-[28rem] w-48 h-48 '/>
        </div>
    </div>
  )
}

export default Hero