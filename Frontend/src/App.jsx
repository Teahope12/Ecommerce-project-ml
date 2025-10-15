 import React from 'react'
 import { Routes, Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import Orders from './pages/Orders'

import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  

  return (
   <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <Navbar/>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/product/:productid" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/placeorder" element={<PlaceOrder/>}/>
      <Route path="/about" element={<About/>}/>

    </Routes>
    <Footer/>
   </div>
  )
}

export default App
