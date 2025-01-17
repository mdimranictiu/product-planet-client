import React, { useState } from "react";
import { WithContext as ReactTags ,SEPARATORS} from "react-tag-input";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const AddProduct = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState([
  ]);
  console.log(tags)

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
// send add product information to MongoDB
const axiosSecure=UseAxiosSecure()
const {
        register,
        handleSubmit,
        watch,
        formState: { errors },reset,
      } = useForm()
    
      const onSubmit = (data) => {
        
        const ownerInfo={
            name: user?.displayName,
            email:user?.email,
            photoURL:user?.photoURL
        }
        const status='pending'
        const newProduct={
            ...data ,ownerInfo,tags,status
        }
        console.log(newProduct)
        axiosSecure.post('/addProduct',newProduct)
        .then((res)=>{
          if(res.data.insertedId){
            Swal.fire({
              title: "Good job!",
              text: "Product Added Successfully",
              icon: "success",
              timer:1500
            });
            reset()
          }
        
        })
        .catch((error)=>{
          Swal.fire({
            icon: "error",
            title: "Failed to Add Product",
            text:error.message,
            
          });
        })
      }
 

  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add Product
          </h2>
          <form className="mt-6 px-4 md:px-8 lg:px-16" onSubmit={handleSubmit(onSubmit)}>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" {...register("productName")}
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
                type="text" {...register("productPhotoURL")}
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
              <textarea {...register("productDescription")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Product Description"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Product Owner Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-2">
                  Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none"
                  value={user?.displayName}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 font-semibold mb-2">
                  Owner Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none"
                  value={user?.email }
                  disabled
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                Owner Image <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 focus:outline-none"
                value={user?.photoURL}
                disabled
              />
            </div>

            {/* Tags Input */}
            <div className="mb-4  p-5">
              <label className="block  text-gray-600 font-semibold mb-2">
                Tags
              </label>
              <ReactTags className='w-full p-5'
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                placeholder="Add new tag"
                classNames={{
                  tagInput:
                    "w-full  border border-gray-300 rounded-lg  text-gray-500 focus:outline-none",
                  tag: " text-black px-2 py-1 rounded-lg mr-2",
                  remove: "cursor-pointer bg-red-600 text-sm ml-1",
                }}
              />
            </div>

            {/* External Links */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">
                External Links
              </label>
              <input
                type="url" {...register("externalLink")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EACABE] focus:outline-none"
                placeholder="Enter Website or Landing Page URL"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-[#33435a] text-white font-semibold rounded-lg shadow-md hover:bg-[#1F2937] transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
