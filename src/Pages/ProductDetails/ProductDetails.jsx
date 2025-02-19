import React, { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../hook/useAxiosSecure/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { MdOutlineReport } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import gifUrl from '../../assets/image/pre.gif'


const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)
  const [product, setProduct] = useState();
  const [success, setSuccess] = useState("");
  const [rating, setRating] = useState(0);
  const axiosSecure = UseAxiosSecure();
  const [upvoteError, setUpvoteError] = useState("");
  const [reportError, setReportError] = useState("");
  const [reviews, setreviews] = useState([]);
  const [refetch,Setrefetch]=useState(false)
  const location = useLocation();
  // after showing error clear it.
  useEffect(() => {
    if (upvoteError || reportError || success) {
      const timer = setTimeout(() => {
        setUpvoteError("");
        setReportError("");
        setSuccess("");
      }, 3000);

      // Cleanup to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [upvoteError, reportError, success]);
  useEffect(() => {
    // Ensure productId exists before making the request
    const productId = location?.state?.productId;
    if (productId) {
      setLoading(true)
      axiosSecure
        .get(`/find/product/${productId}`)
        .then((res) => {
          setProduct(res.data);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false)
        });
    }
  }, [location?.state?.productId]);
  document.title=`${product?.productName} Details`
  console.log(product);
  // find reviews about the product
  useEffect(() => {
    // Ensure productId exists before making the request
    const productId = location?.state?.productId;
    if (productId) {
      axiosSecure
        .get(`/find/review/${productId}`)
        .then((res) => {
          setreviews(res.data);
          Setrefetch(false)
        })
        .catch((error) => {
          console.log(error.message);
          Setrefetch(false)
        });
    }
  }, [location?.state?.productId,refetch]);
  console.log(reviews);
  // upvote logic
  const handleUpvote = () => {
    //user check if user found then upvote else back to login page
    if (!user) {
      navigate("/login");
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
  // Report a Content
  const handleReport = () => {
    //  if not, navigate to the login page
    if (!user) {
      navigate("/login");
      return;
    }

    // product owner can't report own product
    if (product?.ownerInfo?.email === user?.email) {
      setReportError("You cannot report your own product");
      return;
    }

    // Check if the user has already reported this product
    const hasUserReported = product?.reporters?.includes(user?.email);
    if (hasUserReported) {
      setReportError("You have already reported this product");
      return;
    }

    // Proceed with reporting the product
    if (location?.state?.productId) {
      axiosSecure
        .patch(`/product/report/${location?.state?.productId}`, {
          reportStatus: true,
          user: user?.email,
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            console.log("Report status successfully updated to true");

            // Update frontend state
            setProduct((prevState) => ({
              ...prevState,
              reportStatus: true,
              reporters: [...(prevState.reporters || []), user?.email],
            }));
          }
        })
        .catch((error) => {
          console.log("Error updating report status:", error.message);
        });
    }
  };
  // rating
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  // submit review
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    const reviewerInfo = {
      reviewerName: user?.displayName,
      reviewerPhotoURL: user?.photoURL,
    };

    const addNewReview = {
      ...data,
      reviewerInfo,
      rating: rating,
      productId: location?.state?.productId,
    };
    console.log(addNewReview);
    axiosSecure
      .post("/addreview", addNewReview)
      .then((res) => {
        if (res.data.insertedId) {
          setSuccess("Review added successfully!");
          Setrefetch(true)
          reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Your Review",
          text: error.message,
        });
      });
  };
 if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl shadow-lg rounded-lg p-8">
          <img
            src={gifUrl}
            alt="Loading"
            className="w-full object-contain"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl  shadow-lg rounded-lg p-8">
        <div className="bg-white text-black mx-auto p-6 rounded-lg ">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Product Details
          </h2>
          <div className="py-10">
            
            <div className="w-[320px] py-2 max-w-full  min-h-[220px]  mx-auto overflow-hidden rounded-lg">
              <img
                src={product?.productPhotoURL}
                alt="Product Photo"
                className="w-full h-full p-3 object-cover border-2 border-gray-300 rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-4 p-4  rounded ">
              {/* Product information*/}
              <h2 className="text-xl font-semibold">
                <span className="text-gray-700">
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
                        className="px-3 py-1 bg-blue-200 text-blue-600 rounded-full text-sm"
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

              <div className="mt-4 flex  gap-4">
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
                <button
                  onClick={handleReport}
                  disabled={product?.ownerInfo?.email === user?.email}
                  className={`px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2 ${
                    product?.ownerInfo?.email === user?.email
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <MdOutlineReport />
                  <span>{product?.reportStatus ? "Reported" : "Report"}</span>
                </button>
              </div>
              {upvoteError && (
                <p className="text-red-600 py-2">{upvoteError}</p>
              )}
              {reportError && (
                <p className="text-red-600 py-2">{reportError}</p>
              )}
              <div className="py-5">
                <h2 className="text-xl font-semibold text-blue-600 py-5">
                  What People Says
                </h2>
                <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="max-w-sm border bg-gray-300 border-gray-200 rounded-lg  p-6"
                    >
                      {/* Reviewer Image */}
                      <div className="flex justify-center mb-4">
                        <img
                          src={review?.reviewerInfo?.reviewerPhotoURL}
                          alt="Reviewer"
                          className="w-16 h-16 rounded-full border  border-gray-300"
                        />
                      </div>

                      {/* Reviewer Name */}
                      <div className="text-center mb-4 text-blue-500">
                        {review?.reviewerInfo?.reviewerName}
                      </div>

                      {/* {/* Rating /} */}
    <div className="flex justify-center items-center mb-4">
  <ReactStars 
    value={review?.rating} 
    size={32}
    activeColor="#b45d0c"
    edit={false} 
  />
</div>

    {/* Review Description */}
                      <p className="text-gray-700 text-justify ">
                        {review?.reviewDescription ||
                          "No description provided."}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="py-10">
                  <h2 className="text-xl font-semibold text-blue-500 mb-6">
                    Write A Review
                  </h2>
                  <form
                    className="max-w-4xl mx-auto bg-white p-6 rounded-lg "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Reviewer Name and Reviewer Image */}
                    <div className="flex flex-col sm:flex-row sm:gap-5 sm:items-center">
                      {/* Reviewer Name */}
                      <div className="mb-6 w-full sm:w-1/2">
                        <label className="block text-gray-700 font-medium mb-2">
                          Reviewer Name
                        </label>
                        <input
                          type="text"
                          value={user?.displayName}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#EACABE] focus:outline-none transition duration-200"
                        />
                      </div>

                      {/* Reviewer Image */}
                      <div className="mb-6 w-full sm:w-1/2">
                        <label className="block text-gray-700 font-medium mb-2">
                          Reviewer Image
                        </label>
                        <input
                          type="text"
                          value={user?.photoURL}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#EACABE] focus:outline-none transition duration-200"
                        />
                      </div>
                    </div>

                    {/* Review Description */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Review Description
                      </label>
                      <textarea
                        placeholder="Write your review here..."
                        {...register("reviewDescription")}
                        required
                        rows={"5"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-[#EACABE] focus:outline-none transition duration-200"
                      />
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Rating
                      </label>
                      <ReactStars
                        onChange={ratingChanged}
                        size={32}
                        activeColor="#b45d0c"
                        isHalf={true}
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className=" bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-[#EACABE] focus:outline-none transition duration-200"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                {success && (
                  <p className="text-green-600 font-semibold">{success}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;