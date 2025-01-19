import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdDashboardCustomize, MdLogout } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { FaBox } from "react-icons/fa";
import { AuthContext } from '../../AuthContext/AuthProvider';
import useModerator from '../../hook/useModerator';
import useAdmin from '../../hook/useAdmin';
import { RiCoupon3Fill } from 'react-icons/ri';
import { FcStatistics } from 'react-icons/fc';




const Dashboard = () => {
  const navigate=useNavigate()
  const {logOut}=useContext(AuthContext)
  const handleSignOut=()=>{
    logOut();
    navigate('/');
    
  }
  const [isModerator,isModeratorLoading] = useModerator();
  const [isAdmin,isAdminLoading]=useAdmin()
  console.log('isadmin from dashboard',isAdmin)

    return (
        <div>
            
            <div className="flex   text-white bg-[#1F2937]">
           <div className='p-10 px-22'>
            <div className='flex gap-5 mb-10 items-center text-2xl'>
            <MdDashboardCustomize></MdDashboardCustomize>
            <h2 className=''>Dashboard</h2>
            </div>
            <ul className='font-bold text-xl space-y-2'>
  {isAdmin ? (
    <>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/adminHome">
          <FcStatistics /><p>Statistics Page</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/manageUsers">
          <FaUserCircle /><p>Manage Users</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/manageCoupons">
          <RiCoupon3Fill /><p>Manage Coupons</p>
        </NavLink>
      </li>
    </>
  ) : isModerator ? (
    <>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/moderatorHome">
          <FaHome /><p>Moderator Home</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/productReview">
          <FaHome /><p>Product Review Queue</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/reportedContent">
          <FaUserCircle /><p>Reported Contents</p>
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/UserHome">
          <FaHome /><p>User Home</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/MyProfile">
          <FaUserCircle /><p>My Profile</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/AddProduct">
          <IoAddCircle /><p>Add Product</p>
        </NavLink>
      </li>
      <li className='py-3'>
        <NavLink className='flex gap-2 items-center' to="/dashboard/MyProducts">
          <FaBox /><p>My Products</p>
        </NavLink>
      </li>
    </>
  )}
</ul>

              <div className="py-32">
    <ul className='flex flex-col  gap-6 text-xl'>
      <li className=" bg-gradient-to-r bg-[#1fd8a0] px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <NavLink to='/' className='flex items-center'>
        <FaHome className="mr-3 text-white text-xl" />
        <button className="w-full text-left text-white font-semibold tracking-wide hover:text-gray-100 focus:outline-none">
          Home
        </button>
        </NavLink>
      </li>
      <li onClick={handleSignOut} className="flex items-center bg-gradient-to-r from-red-500 to-red-400 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <MdLogout className="mr-3 text-white text-xl" />
        <button className="w-full text-left text-white font-semibold tracking-wide hover:text-gray-100 focus:outline-none">
          Logout
        </button>
      </li>
    </ul>
  </div>
           </div>
           <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>

        </div>
    );
};

export default Dashboard;