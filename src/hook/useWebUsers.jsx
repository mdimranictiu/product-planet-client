import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "./useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthProvider";


const useWebUsers = () => {
    const axiosSecure=UseAxiosSecure();
    const [users,setUsers]=useState([]);
    const {loading,setLoading}=useContext(AuthContext)
    
    useEffect(()=>{
        axiosSecure.get('/users')
        .then((res)=>{
           setUsers(res.data);
           console.log(res.data);
           setLoading(false)
        })
        .catch((error)=>{
            console.log('Error to fetch user',error.message);
            setLoading(false)
        })
    },[axiosSecure])
   return [users,setUsers,loading,setLoading]
};

export default useWebUsers;