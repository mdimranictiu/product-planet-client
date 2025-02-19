import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboardCustomize, MdLogout, MdClose } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { AuthContext } from "../../AuthContext/AuthProvider";
import useModerator from "../../hook/useModerator";
import useAdmin from "../../hook/useAdmin";
import ToggleTheme from "../ToggleTheme";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModerator] = useModerator();
  const [isAdmin] = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => logOut();

  return (
    <nav className="bg-[#1F2937] text-white shadow-xl sticky top-0 z-50">
      <div className="flex w-4/5 mx-auto justify-between items-center py-4 px-6">
        <div className="flex items-center gap-4">
          <button className="text-2xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <RiMenu2Line />
          </button>
          <Link to="/">
            <h2 className="text-3xl font-bold max-sm:text-xl" style={{ fontFamily: "'Dancing Script', serif" }}>
              Product Planet
            </h2>
          </Link>
        </div>

        <ul className="hidden md:flex gap-6 text-xl">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/products" className="hover:text-gray-400">Products</Link></li>
          <li><Link to="/advertise" className="hover:text-gray-400">Advertise</Link></li>
        </ul>

        <div className="flex items-center gap-6">
          <ToggleTheme />
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={toggleDropdown} className="w-12 h-12 rounded-full bg-gray-500">
                <img src={user?.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#282344] text-white w-48 rounded shadow-lg z-10">
                  <p className="px-4 py-2 font-medium">{user.displayName}</p>
                  <ul className="py-1">
                    {isModerator && <li className="flex items-center px-4 py-2 hover:bg-gray-600"><MdDashboardCustomize className="mr-2" /><Link to="/dashboard/ModeratorHome">Dashboard</Link></li>}
                    {isAdmin && <li className="flex items-center px-4 py-2 hover:bg-gray-600"><MdDashboardCustomize className="mr-2" /><Link to="/dashboard/adminHome">Dashboard</Link></li>}
                    {!isModerator && !isAdmin && <li className="flex items-center px-4 py-2 hover:bg-gray-600"><MdDashboardCustomize className="mr-2" /><Link to="/dashboard/UserHome">Dashboard</Link></li>}
                    <li onClick={handleSignOut} className="flex items-center px-4 py-2 hover:bg-red-500 cursor-pointer"><MdLogout className="mr-2" />Logout</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-4 py-2 text-white bg-[#FF6154] rounded">Login</Link>
              <Link to="/register" className="px-4 py-2 text-white bg-[#FF6154] rounded">Register</Link>
            </div>
          )}
        </div>
      </div>

      <div ref={menuRef} className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="bg-[#1F2937] w-64 h-full shadow-lg py-6 px-4 relative">
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-2xl p-2 rounded-full">
            <MdClose />
          </button>
          <ul className="mt-12 flex flex-col gap-4 text-lg">
            <li><Link to="/" className="block py-2 px-4 " onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" className="block py-2 px-4 " onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/advertise" className="block py-2 px-4 " onClick={() => setMenuOpen(false)}>Advertise</Link></li>
          </ul>
          {!user ? (
            <div className="mt-6 flex flex-col gap-4">
              <Link to="/login" className="block text-center py-2 bg-[#FF6154] text-white rounded">Login</Link>
              <Link to="/register" className="block text-center py-2 bg-[#FF6154] text-white rounded">Register</Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;