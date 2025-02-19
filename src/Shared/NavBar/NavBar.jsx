import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboardCustomize, MdLogout } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../AuthContext/AuthProvider";
import useModerator from "../../hook/useModerator";
import useAdmin from "../../hook/useAdmin";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const menuClickRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModerator, isModeratorLoading] = useModerator();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdowntoggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleClickOutsideMenu = (event) => {
      if (menuClickRef.current && !menuClickRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const handleSignOut = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
      </li>
      <li>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
      </li>
      <li>
        <Link to="/news" onClick={() => setMenuOpen(false)}>News</Link>
      </li>
      {user && <></>}
    </>
  );

  const conditionalMenu = (
    <>
      {user ? (
        <div ref={dropdownRef} className="relative flex ml-32 items-center max-sm:items-start gap-6 max-sm:flex-col">
          <button onClick={dropdowntoggle} className="rounded-full w-12 h-12 bg-gray-500">
            <img src={user?.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </button>

          {dropdownOpen && (
            <div className="absolute py-3 mt-[236px] max-sm:mt-[60px] text-white bg-[#282344] -ml-[80px] w-48 rounded shadow-lg z-10">
              <div className="px-4 py-2">
                <p className="font-medium">{user.displayName}</p>
              </div>
              {user && (
                <ul className="py-1">
                  {isModerator && (
                    <li className="flex items-center px-4 py-2">
                      <MdDashboardCustomize className="mr-2" />
                      <Link to="/dashboard/ModeratorHome">Dashboard</Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li className="flex items-center px-4 py-2">
                      <MdDashboardCustomize className="mr-2" />
                      <Link to="/dashboard/adminHome">Dashboard</Link>
                    </li>
                  )}
                  {!isModerator && !isAdmin && (
                    <li className="flex items-center px-4 py-2">
                      <MdDashboardCustomize className="mr-2" />
                      <Link to="/dashboard/UserHome">Dashboard</Link>
                    </li>
                  )}

                  <li onClick={handleSignOut} className="flex items-center px-4 py-2">
                    <MdLogout className="mr-2" />
                    <button className="w-full text-left">Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-6 max-sm:hidden ml-32 text-xl max-sm:gap-12">
          <button>
            <Link to="/login" className="px-4 py-2 text-white bg-[#FF6154] rounded">Login</Link>
          </button>
          <button>
            <Link to="/register" className="px-4 py-2 text-white bg-[#FF6154] rounded">Register</Link>
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-[#1F2937] text-white shadow-xl sticky top-0 z-50">
      <div className="flex w-4/5 mx-auto justify-between px-6 items-center py-5">
        <div className="flex gap-2 items-center">
          <div className="hidden px-3 max-md:block">
            <RiMenu2Line onClick={() => setMenuOpen(!menuOpen)} className="text-2xl" />
          </div>
          <Link to="/">
            <h2 className="text-3xl max-sm:text-xl font-bold" style={{ fontFamily: "'Dancing Script', serif" }}>
              Product Planet
            </h2>
          </Link>
        </div>
        <div className="max-md:hidden">
          <ul className="flex ml-32 gap-6 text-xl">{links}</ul>
        </div>
        <div className="">{conditionalMenu}</div>
      </div>

      <div
        ref={menuClickRef}
        className={`fixed top-[80px] left-0 py-12 z-40 w-full bg-white text-[#282344] shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-2xl">
          <MdClose />
        </button>
        <ul className="flex my-5 text-xl flex-col ml-[25px] items-start gap-5">{links}</ul>
        {user ? "" : (
          <div className="flex ml-[25px] flex-col gap-10 items-start">
            <button>
              <Link to="/login" className="px-4 py-2 text-white bg-[#FF6154] rounded">Login</Link>
            </button>
            <button>
              <Link to="/register" className="px-4 py-2 text-white bg-[#FF6154] rounded">Register</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
