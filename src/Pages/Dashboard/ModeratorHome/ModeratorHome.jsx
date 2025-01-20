import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import UseAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';
import { MdPending } from 'react-icons/md';
import { MdReport } from "react-icons/md";



const ModeratorHome= () => {
const {user}=useContext(AuthContext)
    console.log('auth ' ,user)
    const [reportContent,setReportContent]=useState(0)
    const [reviewContent,setReviewContent]=useState(0)
    const axiosSecure=UseAxiosSecure()
    // fetch report content
      useEffect(() => {
        axiosSecure
          .get("/find/reportedContent")
          .then((res) => {
            setReportContent(res.data);
          })
          .catch((error) => {
            console.error("Error fetching products:", error.message);
          });
      }, [axiosSecure]);
// fetch review content
  useEffect(() => {
    axiosSecure
      .get("/productReview")
      .then((res) => {
        setReviewContent(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, [axiosSecure]);


    return (
        <div className='bg-[#111827] min-h-screen'>
                  <div className='p-16 max-sm:p-5'>
                  <h2 className="text-2xl font-bold text-white">
                                Welcome back, {user?.displayName}!
                    </h2>
                    <div className=' my-10'>
                      <div className='grid grid-cols-3 px-10 py-10 max-sm:px-2 max-sm:py-5 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                        <div className=' h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#FB923C]'>
                          <MdPending className='text-4xl'></MdPending>
                          <h2 className='text-2xl font-bold'>Under Review Products</h2>
                          <span className='text-2xl font-bold'>{reviewContent?.length}</span>
                        </div>
                        <div className=' h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-red-500'>
                          <MdReport className='text-4xl'></MdReport>
                          <h2 className='text-2xl font-bold'>Reported Products</h2>
                          <span className='text-2xl font-bold'>{reportContent?.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
    );
};


export default ModeratorHome;