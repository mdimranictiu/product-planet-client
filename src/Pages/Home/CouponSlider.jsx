import React, { useEffect, useState } from 'react';
import Slider from 'react-infinite-logo-slider';
import UseAxiosPublic from '../../hook/useAxiosPublic/UseAxiosPublic';
import { MdOutlineContentCopy } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";


const CouponSlider = () => {
    const [coupons, setCoupons] = useState([]);
    const [copiedCoupon, setCopiedCoupon] = useState(null); 
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/find/validCoupon`)
            .then((res) => {
                setCoupons(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosPublic]);

    // Function to copy coupon code
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCoupon(code);

        // Reset "Copied!" message after 2 seconds
        setTimeout(() => {
            setCopiedCoupon(null);
        }, 1000);
    };

    return (
        <div className="mb-5 py-10 max-sm:w-full w-4/5 mx-auto px-10  rounded-2xl shadow-lg">
            <h2 className="text-center font-bold text-3xl py-10">
                Valid Coupons 
            </h2>
            <div className="">
                <Slider width="400px" duration={20} pauseOnHover={true} blurBorders={false} blurBorderColor={"#fff"}>
                    {coupons?.map((coupon, index) => (
                        <Slider.Slide key={coupon._id || index}>
                            <div className="w-[220px] min-h-[100px] shadow-xl rounded-xl p-6 border border-gray-300 bg-white flex flex-col justify-center items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
                                <p className="text-lg  text-green-600"> {coupon.DiscountAmount} USD Off</p>
                                
                                <div className="flex items-center space-x-2 mt-3">
                                    <h3 className="text-lg font-bold text-blue-600">{coupon.CouponCode}</h3>
                                    <button
                                        onClick={() => handleCopy(coupon.CouponCode)}
                                        className="rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                                    >
                                         {copiedCoupon === coupon.CouponCode ? (
                                            <CiCircleCheck className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <MdOutlineContentCopy className="w-5 h-5 text-gray-700" />
                                        )}
                                    </button>
                                   
                                </div>

                                {copiedCoupon === coupon.CouponCode && (
                                    <span className="text-sm text-green-500 mt-2">Copied!</span>
                                )}

                                <p className="text-sm text-red-500 mt-3">Expires: {coupon.ExpiredDate || "N/A"}</p>
                            </div>
                        </Slider.Slide>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CouponSlider;
