import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthProvider";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate()

  const [product, setProduct] = useState();
  const axiosSecure = UseAxiosSecure();
  const [upvoteError, setUpvoteError] = useState("");
  const location = useLocation();
  useEffect(() => {
    // Ensure productId exists before making the request
    const productId = location?.state?.productId;
    if (productId) {
      axiosSecure
        .get(`/find/product/${productId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [location?.state?.productId]);
  console.log(product);

  // upvote logic
  const handleUpvote = () => {
    //user check if user found then upvote else back to login page
    if(!user){
       navigate('/login')
    }
    //  if the product owner is trying to upvote their own product
    if (product?.ownerInfo?.email === user?.email) {
      setUpvoteError("You cannot upvote your own product");
      return;
    }

    // check if the user already upvote the product
    const hasUserUpvoted = product?.upvoters?.includes(user?.email);
    if (hasUserUpvoted) {
      setUpvoteError("You have already upvoted this product");
      return;
    }

    // Proceed with upvote
    if (location?.state?.productId) {
      const newUpvoteCount = (product?.upvoteCount || 0) + 1;

      axiosSecure
        .patch(`/product/upvote/${location?.state?.productId}`, {
          upvoteCount: newUpvoteCount,
          user: user?.email, 
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            console.log("Upvote successfully updated:", newUpvoteCount);

            // Update frontend state
            setProduct((prevState) => ({
              ...prevState,
              upvoteCount: newUpvoteCount,
              upvoters: [...(prevState.upvoters || []), user?.email], 
            }));
          }
        })
        .catch((error) => {
          console.log("Error updating upvote:", error.message);
        });
    }
  };

  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Product Details
          </h2>
          <div className="py-10">
            <div className="w-[320px] max-w-full h-[220px] mx-auto overflow-hidden rounded-lg shadow-lg">
              <img
                src={product?.productPhotoURL}
                alt="Product Photo"
                className="w-full h-full object-cover border-2 border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-4 p-4 border rounded shadow-lg">
              {/* Product information*/}
              <h2 className="text-xl font-semibold">
                <span className="text-gray-700">
                  Product Name:{" "}
                  <span className="text-blue-600"> {product?.productName}</span>
                </span>
              </h2>

              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Description:
                </h3>
                <p className="text-gray-600 text-justify">
                  {product?.productDescription}
                </p>
              </div>

              {product?.tags?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">Tags:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product?.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product?.externalLink && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Product Link:
                  </h4>
                  <a
                    href={product?.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {product?.externalLink}
                  </a>
                </div>
              )}

              <div className="mt-6 flex  gap-4">
                <button
                  onClick={handleUpvote}
                  disabled={product?.ownerInfo?.email === user?.email}
                  className={`px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ${
                    product?.ownerInfo?.email === user?.email
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <FaThumbsUp />
                  <span>{product?.upvoteCount || 0} Upvotes</span>
                </button>
              </div>
              {upvoteError && (
                <p className="text-red-600 py-2">{upvoteError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
