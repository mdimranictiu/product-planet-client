import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import NavBar from '../../Shared/NavBar/NavBar';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { FaBox } from "react-icons/fa";



const Dashboard = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="flex  text-white bg-[#1F2937]">
           <div className='p-10 px-22'>
            <div className='flex gap-5 mb-10 items-center text-2xl'>
            <MdDashboardCustomize></MdDashboardCustomize>
            <h2 className=''>Dashboard</h2>
            </div>
           <ul className='font-bold text-xl  space-y-2 '>
                
                <li className='py-3'>
                  <NavLink className='flex gap-2 items-center' to="/dashboard">
                    <FaHome></FaHome><p>Home</p>
                  </NavLink>
                </li>
                <li className='py-3'>
                  <NavLink className='flex gap-2 items-center' to="/dashboard/MyProfile">
                    <FaUserCircle></FaUserCircle><p>My Profile</p>
                  </NavLink>
                </li>
                <li className='py-3'>
                  <NavLink className='flex gap-2 items-center' to="/dashboard/AddProduct">
                    <IoAddCircle></IoAddCircle><p>Add Product</p>
                  </NavLink>
                </li>
                <li className='py-3'>
                  <NavLink className='flex gap-2 items-center' to="/dashboard/MyProducts">
                    <FaBox></FaBox><p>My Products</p>
                  </NavLink>
                </li>
  
              </ul>
           </div>
           <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>

        </div>
    );
};

export default Dashboard;