import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { MdDashboardCustomize, MdLogout } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { FaBox } from "react-icons/fa";
import { AuthContext } from '../../AuthContext/AuthProvider';
import useModerator from '../../hook/useModerator';
import useAdmin from '../../hook/useAdmin';
import { RiCoupon3Fill, RiMenu2Line } from 'react-icons/ri';
import { FcStatistics } from 'react-icons/fc';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false); // state to handle menu open/close
  const menuRef = useRef(null); // Ref for the menu to detect clicks outside

  const handleSignOut = () => {
    logOut();
    navigate('/');
  };

  const [isModerator, isModeratorLoading] = useModerator();
  const [isAdmin, isAdminLoading] = useAdmin();

  console.log('isAdmin from dashboard', isAdmin);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      {/* Hamburger */}
      <div className="hidden px-3 max-md:block">
        <RiMenu2Line onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer" />
      </div>

      <div className="flex text-white bg-[#1F2937]">
       
        <div
          ref={menuRef} 
          className={`fixed top-0 left-0 w-64 bg-[#1F2937] text-white shadow-lg transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-auto`}
        >
          <div className="p-10">
            <div className="flex gap-5 mb-10 items-center text-2xl">
              <MdDashboardCustomize />
              <h2>Dashboard</h2>
            </div>
            <ul className="font-bold text-xl space-y-2">
              {isAdmin ? (
                <>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/adminHome">
                      <FcStatistics />
                      <p>Statistics Page</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/manageUsers">
                      <FaUserCircle />
                      <p>Manage Users</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/manageCoupons">
                      <RiCoupon3Fill />
                      <p>Manage Coupons</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/myProfile">
                      <RiCoupon3Fill />
                      <p>My Profile</p>
                    </NavLink>
                  </li>
                </>
              ) : isModerator ? (
                <>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/moderatorHome">
                      <FaHome />
                      <p>Moderator Home</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/productReview">
                      <FaHome />
                      <p>Product Review Queue</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/reportedContent">
                      <FaUserCircle />
                      <p>Reported Contents</p>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/UserHome">
                      <FaHome />
                      <p>User Home</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/MyProfile">
                      <FaUserCircle />
                      <p>My Profile</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/AddProduct">
                      <IoAddCircle />
                      <p>Add Product</p>
                    </NavLink>
                  </li>
                  <li className="py-3">
                    <NavLink className="flex gap-2 items-center" to="/dashboard/MyProducts">
                      <FaBox />
                      <p>My Products</p>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

           
            <div className="py-32">
              <ul className="flex flex-col gap-6 text-xl">
                <li className="bg-gradient-to-r bg-[#1fd8a0] px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <NavLink to="/" className="flex items-center">
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
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
