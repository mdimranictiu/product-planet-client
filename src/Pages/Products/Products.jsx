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
  const [sortOption, setSortOption] = useState("latest"); // Default sorting

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
        let sortedProducts = res.data.products || [];

        // Apply sorting based on selected option
        if (sortOption === "popular") {
          sortedProducts = sortedProducts.sort(
            (a, b) => b.upvoteCount - a.upvoteCount
          );
        } else if (sortOption === "latest") {
          sortedProducts = sortedProducts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setProducts(sortedProducts);
        setCurrentPage(res.data.currentPage || 1);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching products:", error.message))
      .finally(() => setLoading(false));
  }, [axiosPublic, search, currentPage, sortOption]);

  return (
    <div className="py-10 w-4/5 max-sm:w-full max-md:w-full mx-auto px-10">
      <h2 className="text-center font-bold text-3xl py-10">Products</h2>

      {/* Search bar */}
      <div className="flex items-center max-sm:w-full w-3/5 mx-auto my-10 bg-gray-200 p-2 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search products by tags or Product name"
          className="w-full p-2 rounded-l-lg focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-blue-600 text-white rounded-r-lg">
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div className="p-5">
        <label htmlFor="sort" className="block text-lg font-medium mb-2">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Product Listing */}
      <div className="grid py-5 grid-cols-3 min-h-screen max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="max-w-sm max-sm:w-full rounded-xl min-h-[320px] py-5 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
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
                  <Link
                    to="/productDetails"
                    state={{ productId: product._id }}
                  >
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
                {/* <p className="text-gray-500 text-sm mt-2">
                  Created on: {new Date(product.createdAt).toLocaleDateString()}
                </p> */}
                <button
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
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
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
