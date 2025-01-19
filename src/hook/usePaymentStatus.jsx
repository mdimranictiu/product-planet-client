import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "./useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../AuthContext/AuthProvider";


const usePaymentStatus = () => {
    const {user}=useContext(AuthContext);
    const axiosSecure=UseAxiosSecure();
    const [paymentStatus,setPaymentStatus]=useState(null)
    useEffect(()=>{
        const userEmail=user?.email;
        axiosSecure.get(`/users/payment-status/${userEmail}`)
        .then((res)=>{
           setPaymentStatus(res.data);
        })
        .catch((error)=>{
            console.log('fetch info about payment Status is error',error.message)
        })
    },[axiosSecure])

    return [setPaymentStatus,paymentStatus]

};

export default usePaymentStatus;