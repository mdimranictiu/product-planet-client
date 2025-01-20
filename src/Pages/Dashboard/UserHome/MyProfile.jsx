import React from "react";
import useAuth from "../../../hook/useAuth";
import usePaymentStatus from "../../../hook/usePaymentStatus";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useAuth();
  const [setPaymentStatus, paymentStatus] = usePaymentStatus();
  const navigate=useNavigate()
  console.log(paymentStatus);
  const location=useLocation()
  // title
  document.title=`${user?.displayName} Profile`
  return (
    <div className="flex justify-center items-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          {/* Profile Heading */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            My Profile
          </h2>

          {/* Profile Picture */}
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-[#1F2937]">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Information */}
          <div className="text-center mt-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Name: <span className="text-gray-900">{user?.displayName || "N/A"}</span>
            </h3>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              Email: <span className="text-gray-900">{user?.email || "N/A"}</span>
            </h3>
          </div>

          {/* Payment Status Button */}
          <div className="text-center mt-8">
          <Link to='/dashboard/payment' state={{ from: location }}> <button onClick={()=>handleMakePayment()}
  disabled={paymentStatus?.paystatus == true}
  className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition duration-300 ${
    paymentStatus?.paystatus === true
      ? "bg-gray-900 text-white cursor-not-allowed"
      : "bg-red-500 text-white hover:bg-red-600"
  }`}
>
  {paymentStatus?.paystatus === true ? "Verified" : "Pay $10"}
</button></Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
