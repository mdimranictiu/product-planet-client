import React, { useContext, useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";
import { AuthContext } from "../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";

const Trending = () => {
  const [products, setProducts] = useState([]);
  const [upvoteErrors, setUpvoteErrors] = useState({});
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // Clear errors for a specific product after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setUpvoteErrors({});
    }, 3000);
    return () => clearTimeout(timer);
  }, [upvoteErrors]);

  useEffect(() => {
    axiosPublic
      .get("/trending-product")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching feature products:", error.message);
      });
  }, [axiosPublic]);

  const handleUpvote = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (product?.ownerInfo?.email === user?.email) {
      setUpvoteErrors((prev) => ({
        ...prev,
        [product._id]: "You cannot upvote your own product.",
      }));
      return;
    }

    if (product?.upvoters?.includes(user?.email)) {
      setUpvoteErrors((prev) => ({
        ...prev,
        [product._id]: "You have already upvoted this product.",
      }));
      return;
    }

    const newUpvoteCount = (product?.upvoteCount || 0) + 1;
    axiosSecure
      .patch(`/product/upvote/${product?._id}`, {
        upvoteCount: newUpvoteCount,
        user: user?.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p._id === product._id
                ? {
                    ...p,
                    upvoteCount: newUpvoteCount,
                    upvoters: [...(p.upvoters || []), user?.email],
                  }
                : p
            )
          );
          setUpvoteErrors((prev) => ({ ...prev, [product._id]: "" }));
        }
      })
      .catch((error) => {
        console.error("Error updating upvote:", error.message);
      });
  };

  return (
    <div className="py-10 max-sm:w-full w-4/5 mx-auto px-10">
        <div>
            <h2 className="text-center font-bold text-3xl py-10">Trending Products</h2>
        </div>
        {loading ? (
        <div className="grid grid-cols-3 p-10 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex max-w-sm  flex-col gap-4">
              <div className="skeleton h-[200px] w-full bg-gray-300 rounded-lg"></div>
              <div className="skeleton h-4 w-36 bg-gray-300 rounded"></div>
              <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
              <div className="skeleton h-4 w-28 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-3 p-5  max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {products?.map((product) => (
       <div
       key={product._id}
       className="max-w-sm rounded-xl min-h-[320px] py-5 overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
     >
            <div className="w-4/5  mx-auto h-[200px] my-5 rounded-xl">
              <img
                className="w-full h-full rounded-xl"
                src={product?.productPhotoURL}
                alt={product?.productName || "Product Image"}
              />
            </div>
            <div className="px-10 py-4">
              <div className="font-bold text-xl mb-2">
                <Link to="/productDetails" state={{ productId: product._id }}>
                  <h2 className="text-indigo-600">{product?.productName}</h2>
                </Link>
              </div>
              
              <div className="mb-2 flex-grow">
                {product?.tags?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product?.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 text-[16px] bg-blue-100 text-blue-600 rounded-full">
                        {tag.text}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No Tags</p>
                )}
              </div>
              <div className="mb-2">
                <button
                  onClick={() => handleUpvote(product)}
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
                {upvoteErrors[product._id] && (
                  <p className="text-red-600 py-2">
                    {upvoteErrors[product._id]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>)}
      <div className="py-10 text-center text-xl font-semibold">
  <Link to="/products">
    <button className="px-6 py-3 text-white bg-blue-500 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:ring-4 focus:ring-[#c27329]/50">
      Show All Products
    </button>
  </Link>
</div>

    </div>
  );
};



export default Trending;