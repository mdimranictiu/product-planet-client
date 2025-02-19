import React, { useContext, useEffect, useState } from "react";
import { FaThumbsUp, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";
import { AuthContext } from "../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [upvoteErrors, setUpvoteErrors] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/products?search=${search}&page=${currentPage}&limit=6`)
      .then((res) => {
        setProducts(res.data.products || []);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching products:", error.message))
      .finally(() => setLoading(false));
  }, [axiosPublic, search, currentPage]);

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
      .catch((error) => console.error("Error updating upvote:", error.message));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  document.title = "Products";

  return (
    <div className="py-10 w-4/5 mx-auto px-10">
      <h2 className="text-center font-bold text-3xl py-10">Products</h2>

      {/* Search bar */}
      <div className="flex items-center w-3/5 mx-auto my-10 bg-gray-200 p-2 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search products by tags"
          className="w-full p-2 rounded-l-lg focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-blue-600 text-white rounded-r-lg">
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="grid py-5 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="max-w-sm rounded-xl min-h-[320px] py-5 shadow-2xl animate-pulse bg-gray-200"
            >
              <div className="w-4/5 mx-auto h-[200px] my-5 rounded-xl bg-gray-300"></div>
              <div className="px-5 py-4">
                <div className="h-6 bg-gray-300 w-3/4 rounded-md mb-4"></div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-gray-300 w-16 rounded-full"></div>
                  <div className="px-3 py-1 bg-gray-300 w-20 rounded-full"></div>
                </div>
                <div className="mt-4 h-10 bg-gray-300 w-full rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid py-5 grid-cols-3 min-h-screen max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="max-w-sm rounded-xl min-h-[320px] py-5 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="w-4/5 mx-auto h-[200px] my-5 rounded-xl">
                  <img
                    className="w-full h-full rounded-xl"
                    src={product?.productPhotoURL}
                    alt={product?.productName || "Product Image"}
                  />
                </div>
                <div className="px-5 py-4">
                  <h3 className="font-bold text-xl text-indigo-600">
                    <Link to="/productDetails" state={{ productId: product._id }}>
                      {product?.productName}
                    </Link>
                  </h3>
                  {product?.tags?.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => handleUpvote(product)}
                    disabled={product?.ownerInfo?.email === user?.email}
                    className={`mt-4 px-6 py-2 rounded-lg text-white flex items-center gap-2 ${
                      product?.ownerInfo?.email === user?.email
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <FaThumbsUp />
                    <span>{product?.upvoteCount || 0} Upvotes</span>
                  </button>
                  {upvoteErrors[product._id] && (
                    <p className="text-red-600 mt-2">{upvoteErrors[product._id]}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center  text-xl text-gray-500">No products found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
