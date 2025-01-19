import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import UseAxiosSecure from "../../../hook/useAxiosSecure/useAxiosSecure";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get("/myProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, [axiosSecure]);
  // Delete a product
  const handleDelete = (id) => {
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
                text: "Your product has been deleted.",
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
            My Products
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
                        Votes
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {product.productName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {product?.upvoteCount || 0}
                        </td>
                        <td
                          className={`border  px-4 py-2 capitalize ${
                            product.status === "Accepted"
                              ? "bg-green-100 text-green-600"
                              : product.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {product.status || "Pending"}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <Link
                            to="/dashboard/UpdateProduct"
                            state={{ productId: product._id }}
                          >
                            <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                              Update
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
                  You have no product
                </h2>
                <p className="text-gray-500 mt-4">
                  It seems you haven't added any products yet. Click below to
                  add one!
                </p>

                <button
                  className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    navigate("/dashboard/AddProduct");
                  }}
                >
                  Add Product
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
