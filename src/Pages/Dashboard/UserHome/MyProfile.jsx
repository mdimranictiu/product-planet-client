import React from "react";
import useAuth from "../../../hook/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            My Profile
          </h2>

          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-[#1F2937]">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center mt-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Name: <span className="text-gray-900">{user?.displayName}</span>
            </h3>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">
              Email: <span className="text-gray-900">{user?.email}</span>
            </h3>
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-[#1F2937] text-white font-semibold rounded-lg shadow-lgtransition duration-300">
              Pay $10
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
