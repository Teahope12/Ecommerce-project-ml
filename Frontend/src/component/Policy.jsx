import React from 'react';

function Policy() {
  return (
    <div className='flex flex-col md:flex-row justify-evenly items-center border-2 p-10 mt-16 mb-16 gap-10'>
      <div className='flex flex-col items-center'>
        <img src='../public/exchange.png' alt='Easy exchange policy' className='w-24 h-24' />
        <h1 className='text-lg italic p-2 text-center'>Easy Exchange</h1>
      </div>
      <div className='flex flex-col items-center'>
        <img src='../public/return.png' alt='7-day return policy' className='w-24 h-24' />
        <h1 className='text-lg italic p-2 text-center'>7 Day Easy Return</h1>
      </div>
      <div className='flex flex-col items-center'>
        <img src='../public/contact.png' alt='Customer support' className='w-24 h-24' />
        <h1 className='text-lg italic p-2 text-center'>Best Customer Support</h1>
      </div>
    </div>
  );
}

export default Policy;
