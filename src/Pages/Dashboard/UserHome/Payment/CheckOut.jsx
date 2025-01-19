import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../../../hook/useAxiosSecure/useAxiosSecure";
import { AuthContext } from "../../../../AuthContext/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [txid, setTxid] = useState(null);
  const location=useLocation()

  const axiosSecure = UseAxiosSecure();
  const totalPrice = 10;
  const navigate=useNavigate();
  const from=location.state?.from?.pathname || '/';
  

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      setTxid(paymentIntent.id);
      await axiosSecure.patch(`/payment/${user?.email}`)
      .then((res) => {
        if (res.modifiedCount > 0) {
            
        } else {
          console.log("Payment status update failed.");
        }
      })
      .catch((error) => {
        console.error("Error updating payment status:", error);
      });
      
      setTimeout(() => {
        navigate(from)
      }, 3000);
     
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="rounded-lg bg-gray-800 shadow-[32px] p-6 md:p-10 max-w-lg w-full">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="p-4 mb-4 shadow-sm bg-white rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Pay ${totalPrice}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {txid && (
  <p className="text-green-600 mt-4 text-center">
    <span>Payment successful!</span>
    <br />
    <span>Your payment ID: {txid}</span>
    
  </p>
)}

    </div>
  </div>
  

  );
};

export default CheckOut;
