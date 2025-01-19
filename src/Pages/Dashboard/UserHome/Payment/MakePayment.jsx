import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";

const paymentKey = import.meta.env.VITE_PAYMENT_KEY;
const stripePromise = paymentKey ? loadStripe(paymentKey) : null;

const MakePayment = () => {
  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center  bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Stripe Configuration Error
          </h1>
          <p className="text-gray-700 mt-2">
            Please check your payment key configuration in the environment
            settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <Elements stripe={stripePromise}>
          <CheckOut />
        </Elements>
    </div>
  );
};

export default MakePayment;
