import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Lottie from "lottie-react";
import errorLottieAnimation from '../../assets/error.json'

const ErrorPage = () => {
    const error = useRouteError();
    document.title="Error Page"
    return (
        <div className='flex flex-col  h-screen items-center justify-center'>
            <Lottie animationData={errorLottieAnimation} loop={true} />
            <h2 className='text-4xl py-2 pb-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#282344] via-[#282342] to-[#282344]'>{error.statusText || error.message}</h2>
            <Link to="/">
  <button className="font-bold text-3xl px-5 py-2 bg-rose-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-rose-600 transform hover:scale-105 transition-transform duration-300">
    Home
  </button>
</Link>

        </div>
    );
};

export default ErrorPage;