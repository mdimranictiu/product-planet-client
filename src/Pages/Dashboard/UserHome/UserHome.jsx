import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import { FaBox } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import UseAxiosSecure from '../../../hook/useAxiosSecure/useAxiosSecure';






const UserHome= () => {
  const [products, setProducts] = useState([]);
  const axiosSecure=UseAxiosSecure();
  const [accepted,setAccepted]=useState(0)
  const [pending,setPending]=useState(0)
  const [reject,setRejected]=useState(0)
  

    useEffect(() => {
      axiosSecure
        .get("/myProducts")
        .then((res) => {
          setProducts(res.data);
          const acceptedProducts = res?.data?.filter(product => product.status === 'Accepted');
          const pendingProducts = res?.data?.filter(product => product.status === 'pending');
          const rejectedProducts = res?.data?.filter(product => product.status === 'Rejected');
          setAccepted(acceptedProducts)
          setPending(pendingProducts)
          setRejected(rejectedProducts)
        })
        .catch((error) => {
          console.error("Error fetching products:", error.message);
        });
    }, [axiosSecure]);
  
// accepted products

  
const {user}=useContext(AuthContext)
    console.log('auth ' ,user)
document.title= `${user?.displayName} Home`
    return (
        <div className='bg-[#111827] min-h-screen'>
          <div className='p-16 max-sm:p-5'>
          <h2 className="text-2xl font-bold text-white">
                        Welcome back, {user?.displayName}!
            </h2>
            <div className=' my-10'>
              <div className='grid grid-cols-3 px-10 py-10 max-sm:px-2 max-sm:py-5 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1'>
                <div className='h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#0D9488]'>
                  <FaBox className='text-4xl'></FaBox>
                  <h2 className='text-2xl font-bold'>My Products</h2>
                  <span className='text-2xl font-bold'>{products?.length}</span>
                </div>
                <div className=' h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#3B82F6]'>
                  <FaCheckCircle className='text-4xl'></FaCheckCircle>
                  <h2 className='text-2xl font-bold'>My Accepted Products</h2>
                  <span className='text-2xl font-bold'>{accepted?.length}</span>
                </div>
                <div className=' h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-[#FB923C]'>
                  <MdPending className='text-4xl'></MdPending>
                  <h2 className='text-2xl font-bold'>My Pending Products</h2>
                  <span className='text-2xl font-bold'>{pending?.length}</span>
                </div>
                <div className=' h-[220px] flex flex-col gap-5 items-center justify-center rounded-xl bg-red-500'>
                  <RxCrossCircled className='text-4xl'></RxCrossCircled>
                  <h2 className='text-2xl font-bold'>My Rejected Products</h2>
                  <span className='text-2xl font-bold'>{reject?.length}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    );
};

export default UserHome;