import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CouponPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [fetching, setFetching] = useState(false);

  // Clear error and success messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Fetch all coupons
  useEffect(() => {
    setFetching(true);
    axiosSecure
      .get("/find/coupon")
      .then((res) => {
        setCoupons(res.data);
        setFetching(false);
      })
      .catch(() => {
        console.error("Failed to fetch coupons");
        setFetching(false);
      });
  }, [fetching, axiosSecure]);

  // Form submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axiosSecure
      .post("/add/coupon", data)
      .then(() => {
        setSuccess("Coupon added successfully!");
        reset();
        setFetching(true); 
      })
      .catch((err) => {
        setError(`Failed to add coupon: ${err.message}`);
      });
  };

  // Delete coupon
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/coupon/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Coupon has been deleted.", "success");
              setCoupons(coupons.filter((coupon) => coupon._id !== id));
            }
          })
          .catch((err) => {
            Swal.fire("Error!", `Failed to delete coupon: ${err.message}`, "error");
          });
      }
    });
  };

  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Manage Coupons
          </h2>

          {/* Add Coupon Form */}
          <div className="py-10">
            <h2 className="text-xl font-semibold text-blue-500 mb-6">
              Add New Coupon
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
                Add Coupon
              </button>
              {success && <p className="text-green-600 font-semibold mt-4">{success}</p>}
              {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
            </form>
          </div>

          {/* Coupon List */}
          <div className="py-10">
            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
              {coupons.map((coupon, index) => (
                <div
                  key={index}
                  className="max-w-sm border flex flex-col items-center bg-gray-300 border-gray-200 rounded-lg shadow-md p-6"
                >
                  <div className="text-center mb-4 text-blue-500 font-bold">
                    <span>Coupon Code: </span>
                    {coupon?.CouponCode}
                  </div>
                  <div className="text-center mb-4 text-gray-600">
                    <span>Expires On: </span>
                    {coupon?.ExpiredDate || "No Expiry Date"}
                  </div>
                  <p className="text-gray-700 text-justify mb-4">
                    {coupon?.CouponDescription}
                  </p>
                  <div className="text-center text-green-500 font-semibold mb-4">
                    <span>Discount: $</span>
                    {coupon?.DiscountAmount}
                  </div>
                  <div className="flex gap-2 mt-4">
                   <Link to='/dashboard/updateCoupon' state={{ couponId: coupon._id }}>
                   <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      
                    >
                      Edit
                    </button></Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
