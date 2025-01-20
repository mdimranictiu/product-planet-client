import React, { useContext, useEffect, useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const UpdateProduct = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState();
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const updateDataId = location.state.productId;
const {loading,setLoading}=useContext(AuthContext)
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    // Fetch product data
    axiosSecure
      .get(`/myProducts/${updateDataId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching product data", error);
        setLoading(false);
      });
  }, [axiosSecure, updateDataId]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const updateProduct = {
      ...data, status: 'pending',
      tags,
    };
    axiosSecure
      .patch(`/UpdateProduct/${updateDataId}`, updateProduct)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Good job!",
            text: "Product Updated Successfully",
            icon: "success",
            timer: 1500,
          });
          navigate("/dashboard/MyProducts");
        }
      })
      .catch((error) => {
        const errorMessage = error.message ;
        Swal.fire({
          icon: "error",
          title: "Failed to Update Product",
          text: errorMessage,
        });
      });
  };
// title
document.title =`${product?.productName} Update`
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Update Product
          </h2>
          <form className="mt-6 px-4 md:px-8 lg:px-16" onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("productName")}
                defaultValue={product?.productName }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Product Name"
                required
              />
            </div>

            {/* Product Image URL */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Product Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("productPhotoURL")}
                defaultValue={product?.productPhotoURL}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Product Image URL"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("productDescription")}
                defaultValue={product?.productDescription}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Product Description"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Tags Input */}
            <div className="mb-4 p-5">
              <label className="block text-gray-600 font-semibold mb-2">Tags</label>
              <ReactTags
                className="w-full p-5"
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                placeholder="Add new tag"
                classNames={{
                  tagInput: "w-full border border-gray-300 rounded-lg text-gray-500 focus:outline-none",
                  tag: "text-black px-2 py-1 rounded-lg mr-2",
                  remove: "cursor-pointer bg-red-600 text-sm ml-1",
                }}
              />
            </div>

            {/* External Links */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">External Links</label>
              <input
                type="url"
                {...register("externalLink")}
                defaultValue={product?.externalLink}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Website or Landing Page URL"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
