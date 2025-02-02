import React, { useEffect, useState } from 'react';
import Slider from 'react-infinite-logo-slider'
import UseAxiosPublic from '../../hook/useAxiosPublic/UseAxiosPublic';

const CouponSlider = () => {
    const [coupons,setcoupons]=useState([])
    const axiosPublic=UseAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/find/validCoupon`)
          .then((res) => {
            const result=res.data;
            setcoupons(result); 
          })
          .catch((error) => {
            console.log(error);
          });
      }, [axiosPublic]);

 console.log(coupons)
 return (
    <div className="py-10 max-sm:w-full w-4/5 mx-auto px-10">
        <h2 className="text-3xl py-5 font-bold text-center text-black">
            Validate Coupons 
        </h2>
        <div className="my-16">
                <Slider width="400px" duration={20} pauseOnHover={true} blurBorders={false} blurBorderColor={"#fff"}>
                    {coupons?.map((coupon, index) => (
                        <Slider.Slide key={coupon._id || index}>
                            <div className="w-[250px] h-[250px] shadow-lg rounded-lg p-5 border border-gray-200 flex flex-col justify-center items-center text-center">
                                <h3 className="text-lg font-bold text-[#25c98a]">{coupon.CouponCode}</h3>
                                <p className="text-sm text-gray-600 mt-2">{coupon.CouponDescription}</p>
                                <p className="text-md font-semibold text-green-600 mt-2">Discount: {coupon.DiscountAmount}%</p>
                                <p className="text-sm text-red-500 mt-2">Expires: {coupon.ExpiredDate}</p>
                            </div>
                        </Slider.Slide>
                    ))}
                </Slider>
            </div>
    </div>
);

 
    }

export default CouponSlider;