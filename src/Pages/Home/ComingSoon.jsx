import React, { useEffect, useState } from "react";
import UseAxiosPublic from "../../hook/useAxiosPublic/UseAxiosPublic";

const ComingSoon = () => {
  const [comingProducts, setComingProducts] = useState([]);
  const axiosPublic = UseAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/comingsoon-products")
      .then((res) => {
        setComingProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error.message);
        setLoading(false);
      });
  }, []);

  const handleNotifyMe = () => {
    if (!email) return;

    setSuccessMessage("Thank you! We will notify you.");

    setTimeout(() => {
      setSuccessMessage("");
      setEmail("");
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="py-10 w-4/5 max-sm:w-full mx-auto px-10">
      <h2 className="text-center font-bold text-3xl py-10">Coming Soon</h2>

      {loading ? (
        <div className="grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full flex gap-5 justify-between items-center p-5 border rounded-md shadow-md bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-sm overflow-hidden">
                  <div className="skeleton h-16 w-16 shrink-0 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-2 text-start">
                  <div className="skeleton h-4 w-36 bg-gray-300 rounded"></div>
                  <div className="skeleton h-4 w-full bg-gray-300 rounded"></div>
                  <div className="skeleton h-4 w-28 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="skeleton h-12 w-full bg-gray-300 rounded"></div>
                <div className="skeleton h-12 w-28 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 max-md:grid-cols-1">
          {comingProducts.map((product) => (
            <div
              key={product._id}
              className="w-full flex justify-between items-center p-5 border rounded-md shadow-md bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-sm overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.productName}
                  />
                </div>
                <div className="flex flex-col text-start">
                  <h2 className="text-xl max-sm:text-sm font-semibold">
                    {product.productName}
                  </h2>
                  <p className="text-gray-700 max-sm:text-sm">
                    {product.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {product.category.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="border-2 max-sm:text-sm max-sm:py-1 border-gray-300 hover:border-[#FF6154] transition duration-300 rounded-sm px-5 py-2"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.href
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Share
                </button>
                <button
                  className="bg-[#FF6154] max-sm:text-sm max-sm:py-1 text-white px-5 py-2 rounded-sm hover:bg-red-500 transition duration-300"
                  onClick={() => setModalOpen(true)}
                >
                  Notify Me
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notify Me Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Get Notified</h3>
            <p className="text-gray-600 text-sm">
              Enter your email to receive updates.
            </p>

            <input
              type="email"
              className="mt-4 p-2 w-full border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#FF6154] text-white rounded-md hover:bg-red-500"
                onClick={handleNotifyMe}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
