import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import useWebUsers from "../../../hook/useWebUsers";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [users,setUsers,loading,setLoading]=useWebUsers();
  console.log(users)
  const extractUsername = (email) => {
    if (!email || typeof email !== "string") return null; 
    return email.split('@')[0];
};

// makeModerator
const makeModerator=(email)=>{
    console.log(email)
    const updateInfo={
        email:email,
        role:'moderator'
    }
    axiosSecure.patch('/users/makeModerator',updateInfo)
    
    .then((res)=>{
        if(res.data.modifiedCount){
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.email === email ? { ...user, role: "moderator" } : user
                )
              );
        }
    })
    .catch((error)=>{
        Swal.fire({
                  icon: "error",
                  title: "Failed to Make as Moderator",
                  text: error.message,
      });
    })

}
//make admin
const makeAdmin=(email)=>{
    console.log(email)
    const updateInfo={
        email:email,
        role:'admin'
    }
    axiosSecure.patch('/users/makeAdmin',updateInfo)
    
    .then((res)=>{
        if(res.data.modifiedCount){
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.email === email ? { ...user, role: "admin" } : user
                )
              );
        }
    })
    .catch((error)=>{
        Swal.fire({
                  icon: "error",
                  title: "Failed to Make as Admin",
                  text: error.message,
      });
    })

}

 // convert email to string

const handleEmail = (email) => {
    if (typeof email === "string") {
      return email;  
    }

    if (email && email.email) {
      return email.email;  
    }
    return "user@gmail.com";
  };
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 min-h-screen rounded-lg shadow-lg">
          <h2 className="text-3xl border-b-2 font-bold text-center text-gray-800 my-5">
            Manage Users
          </h2>
          {users.length > 0 ? (
            <>
              <div>
                <table className="table-auto w-full border-collapse border text-center border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 ">
                      <th className="border border-gray-300 px-4 py-2">
                        Index
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                      User name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                      User email 
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                      Make Moderator
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                      Make Admin 
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user,index) => (
                      <tr key={user._id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {index+1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                        {user?.userName ? user?.userName : extractUsername(user?.email) || 'Anonymous'}
                        </td>
                        <td key={user?.email} className="border border-gray-300 px-4 py-2">
                        {handleEmail(user?.email)}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                        {user.role !== "moderator" ? (
    <button
      onClick={() => makeModerator(user?.email)}
      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
    >
      Make Moderator
    </button>
  ) : (
    <button
      disabled
      className="px-4 py-2 bg-gray-500 text-white rounded shadow cursor-not-allowed"
    >
      Moderator
    </button>
  )} 
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              
                            {user.role !== "admin" ? (
    <button
      onClick={() => makeAdmin(user?.email)}
      className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition duration-300"
    >
      Make Admin
    </button>
  ) : (
    <button
      disabled
      className="px-4 py-2 bg-gray-500 text-white rounded shadow cursor-not-allowed"
    >
       Admin
    </button>
  )}
                             
                            </td>
                     
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700">
                  You have No User Right Now
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};



export default ManageUsers;