import React from 'react'
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'
import Orders from './Orders'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import { ToastContainer } from 'react-toastify'
function Iflogin({setToken}) {
  return (
    <>
     <ToastContainer/>
    <Navbar setToken={setToken}/>
    <div className='flex flex-row' >
    <Sidebar/>
    <Routes>
       <Route path="/Add" element={<AddProduct />} />
       <Route path="/list" element={<ListProduct />} />
       <Route path="/Orders" element={<Orders />} />
    </Routes>
    </div>
     </>
  )
}

export default Iflogin