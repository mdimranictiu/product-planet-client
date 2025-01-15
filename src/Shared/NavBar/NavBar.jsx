import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { RiMenu2Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../AuthContext/AuthProvider";





const NavBar = () => {
  const {user,logOut}=useContext(AuthContext)
  const dropdownRef=useRef(null)
  const menuClickRef=useRef(null)
  const [menuOpen, setMenuOpen] = useState(false);

  const [dropdownOpen, setdropdownOpen] = useState(false);
  const dropdowntoggle = () => {
    setdropdownOpen(!dropdownOpen);
  };

  // when user click outside of the target then the item will be close
  useEffect(()=>{
    const handleClickOutside=(event)=>{
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setdropdownOpen(false)
        }
    }
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>{
        document.removeEventListener('mousedown',handleClickOutside)
    }

  },[])
  // useEffect(()=>{
  //   const handleClickMenuOutside=(event)=>{
  //       if(menuClickRef.current && !menuClickRef.current.contains(event.target)){
  //           setMenuOpen(false)
  //       }
  //   }
  //   document.addEventListener('mousedown',handleClickMenuOutside);
  //   return ()=>{
  //       document.removeEventListener('mousedown',handleClickMenuOutside)
  //   }

  // },[])
  const handleSignOut=()=>{
    logOut();
  }
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>

      {
        // if any user found then this link will be shown
        user && (
          <>
          
         
          </>
        )
      }
    </>
  );
  const conditionalMenu = (
    <>
      {user ? (
        <div ref={dropdownRef} className="relative flex ml-32 items-center max-sm:items-start gap-6 max-sm:flex-col">
          <button
            onClick={dropdowntoggle}
            className="rounded-full w-12 h-12 bg-gray-500"
          >
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
   
   { dropdownOpen && (
     <div className="absolute py-3 mt-[236px] max-sm:mt-[60px] text-white bg-[#282344] -ml-[80px] w-48  rounded shadow-lg z-10">
     <div className="px-4 py-2">
       <p className=" font-medium">{user.displayName}</p>
     </div>
     <ul className="py-1">
     <li className="flex items-center px-4 py-2">
              <MdDashboardCustomize className="mr-2" />
              <Link to="/dashboard" className="">Dashboard</Link>
            </li>
            <li onClick={handleSignOut} className="flex items-center px-4 py-2">
              <MdLogout className="mr-2" />
              <button className=" w-full text-left">Logout</button>
            </li>
     </ul>
   </div>
   )}
         
        </div>
      ) : (
        <div className="flex gap-6 max-sm:hidden ml-32 text-xl max-sm:gap-12">
          <button>
            {" "}
            <Link to="/login" className="px-4 py-2 text-white bg-[#FF6154] rounded">
              Login
            </Link>
          </button>
          <button>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-[#FF6154] rounded"
            >
              Register
            </Link>
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-[#1F2937] text-white shadow-xl">
       
      <div className="flex w-4/5 mx-auto justify-between  px-6  items-center py-5 ">
         <div className="flex gap-2 items-center">
         <div className="hidden  px-3 max-md:block">
        <RiMenu2Line onClick={() => setMenuOpen(!menuOpen)} className="text-2xl"></RiMenu2Line>
        </div>
        <Link to='/'><h2 className="text-2xl max-sm:text-xl  font-bold">Product Planet</h2></Link>
         </div>
        <div className="max-md:hidden">
          <ul className="flex ml-32 gap-6 text-xl">{links}</ul>
        </div>
        <div className="">{conditionalMenu}</div>
      </div>
      <div ref={menuClickRef} className={`fixed top-[80px] left-0 py-12 z-40 w-full bg-white text-[#282344] shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
            <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
         <MdClose ></MdClose>
        </button>
        <ul className="flex my-5 text-xl flex-col ml-[25px] items-start gap-5">
        {links}
        </ul>
        {user? "" : <>
          <div className="flex ml-[25px] flex-col gap-10 items-start">
          <button>
            
            <Link to="/login" className="px-4 py-2 text-white bg-[#FF6154] rounded">
              Login
            </Link>
          </button>
          <button>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-[#FF6154] rounded"
            >
              Register
            </Link>
          </button>
        </div>
        </>}
      </div>
    </div>
  );
};

export default NavBar;
