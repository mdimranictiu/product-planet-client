import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const ReportedContent = () => {
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
   const handleReportedContentDelete = (id) => {
     console.log(id);
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     }).then((result) => {
       if (result.isConfirmed) {
         axiosSecure
           .delete(`/delete/${id}`)
           .then((res) => {
             if (res.data.deletedCount > 0) {
               Swal.fire({
                 title: "Deleted!",
                 text: "Reported Content has been deleted.",
                 icon: "success",
               });
               const remainItems = products.filter(
                 (product) => product._id !== id
               );
               setProducts(remainItems);
             }
           })
           .catch((error) => {
             Swal.fire({
               icon: "error",
               title: "Failed to Delete",
               text: error.message,
             });
           });
       }
     });
   };
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl bg-gradient-to-r from-[#1F2937] to-[#33435a] shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 min-h-screen rounded-lg shadow-lg">
          <h2 className="text-3xl border-b-2 font-bold text-center text-gray-800 my-5">
          Reported Content Review
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
        className='px-4 py-2 rounded shadow transition duration-300 bg-red-500 text-white hover:bg-red-600'
        onClick={() => handleReportedContentDelete(product._id)}
       
      >
       Delete
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
                  You have no Reported product to review
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};





export default ReportedContent;