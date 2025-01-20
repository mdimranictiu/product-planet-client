import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const UpdateCoupon = () => {
  const [coupon, setcoupon] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const updateDataId = location?.state?.couponId;
const {loading,setLoading}=useContext(AuthContext)
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    // Fetch product data
    axiosSecure
      .get(`/coupon/${updateDataId}`)
      .then((res) => {
        setcoupon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching product data", error);
        setLoading(false);
      });
  }, [axiosSecure, updateDataId]);

  



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {

    axiosSecure
      .patch(`/UpdateCoupon/${updateDataId}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Good job!",
            text: "Coupon Updated Successfully",
            icon: "success",
            timer: 1500,
          });
          navigate("/dashboard/manageCoupons");
        }
      })
      .catch((error) => {
        const errorMessage = error.message ;
        Swal.fire({
          icon: "error",
          title: "Failed to Update Coupon",
          text: errorMessage,
        });
      });
  };
// title
document.title =`Coupon Update`
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Update Coupon
          </h2>
          <form
              className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col sm:flex-row sm:gap-5 sm:items-center">
                <div className="mb-6 w-full sm:w-1/2">
                  <label className="block text-gray-700 font-medium mb-2">Coupon Code</label>
                  <input
                    type="text"
                    required
                    {...register("CouponCode")}
                    placeholder="Code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                  />
                </div>

                <div className="mb-6 w-full sm:w-1/2">
                  <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                  <input
                    type="date"
                    required
                    {...register("ExpiredDate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                  />
                </div>

                <div className="mb-6 w-full sm:w-1/2">
                  <label className="block text-gray-700 font-medium mb-2">Discount Amount</label>
                  <input
                    type="number"
                    required
                    {...register("DiscountAmount")}
                    placeholder="Example: $5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Coupon Description</label>
                <textarea
                  rows="5"
                  required
                  {...register("CouponDescription")}
                  placeholder="Enter coupon description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-200"
              >
                Update Coupon
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};



export default UpdateCoupon;