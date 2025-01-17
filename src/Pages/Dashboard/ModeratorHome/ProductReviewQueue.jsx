import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const ProductReviewQueue = () => {
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([]);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/productReview")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, [axiosSecure]);
  console.log(products)
 
  // make decision about accept and reject
  const handleStatusChange = (id, status) => {
    // Update the product's status in the backend 
    const productStatus={status:status}
    console.log(productStatus)
    axiosSecure.patch(`/updateProductStatus/${id}`,productStatus)
    .then((res)=>{
      if(res.data.modifiedCount){
      console.log('update status')
      }
    })
    .catch((error)=>{
      Swal.fire({
                icon: "error",
                title: "Failed to Update Product",
                text: error.message,
              });
    })
  
    // update status in UI
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, status } : product
      )
    );
  
    console.log(`Product ${id} status changed to ${status}.`);
  };
  const handleMakeFeature = (id) => {
    const productStatus = { feature: true };
  
    axiosSecure
      .patch(`/makeProductAsFeature/${id}`, productStatus)
      .then((res) => {
        if (res.data.modifiedCount) {
          console.log("Updated feature status");
  
          // Update the feature status in the local UI state
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === id ? { ...product, feature: true } : product
            )
          );
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to mark as Feature",
          text: error.message,
        });
      });
  };
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 min-h-screen rounded-lg shadow-lg">
          <h2 className="text-3xl border-b-2 font-bold text-center text-gray-800 my-5">
          Product Review Queue
          </h2>
          {products.length > 0 ? (
            <>
              <div>
                <table className="table-auto w-full border-collapse border text-center border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 ">
                      <th className="border border-gray-300 px-4 py-2">
                        Product Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        View Details
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Make Feature
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Action
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {products.map((product) => (
  <tr key={product._id} className="border-t border-gray-300 hover:bg-gray-100">
    <td className="border border-gray-300 text-blue-500 px-4 py-2 font-semibold text-center">
      {product.productName}
    </td>
    <td className="border border-gray-300 px-4 py-2 text-center">
      <Link to="/" state={{ productId: product._id }}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300">
          Details
        </button>
      </Link>
    </td>
    <td className="border border-gray-300 px-4 py-2 text-center">
      
        <button
         onClick={()=>handleMakeFeature(product._id)}
         className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600 transition duration-300">
          {product?.feature ? "Featured": 'Make Feature'}
        </button>
     
    </td>
    <td className="border border-gray-300 px-4 py-2 text-center">
    <button
        className={`px-4 py-2 rounded shadow transition duration-300 ${
          product.status === 'Accepted' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
        onClick={() => handleStatusChange(product._id, 'Accepted')}
        disabled={product.status === 'Accepted'}
      >
       {product.status==='Accepted'? 'Accepted':'Accept'}
      </button>
    </td>
    <td className="border border-gray-300 px-4 py-2 text-center">
    <button
        className={`px-4 py-2 rounded shadow transition duration-300 ${
          product.status === 'Rejected' ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
        }`}
        onClick={() => handleStatusChange(product._id, 'Rejected')}
        disabled={product.status === 'Accepted' } 
      >
       {product.status==='Rejected'? 'Rejected':'Reject'}
      </button>
    </td>
  </tr>
))}

                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700">
                  You have no pending product to review
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};



export default ProductReviewQueue;