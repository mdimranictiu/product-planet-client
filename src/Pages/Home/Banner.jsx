import React from 'react';
import bannerImg from '../../../src/assets/image/banner.png'
import animationBannerImg from '../../assets/image/Animation - 1737349108207.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='w-4/5 max-sm:w-full  mx-auto rounded-lg p-10  mt-5 py-6'>
            <div className='flex max-md:flex-col flex-row max-sm:flex-col-reverse gap-20  items-center'>
                <div className='h-full flex gap-5 flex-col items-center justify-center w-full p-6 text-black text-center '>
                    <h1 className='text-6xl max-md:text-5xl max-sm:text-5xl font-bold '>
                        <span className='flex flex-col gap-2 mb-2 text-[#FC6B4C] ' style={{ fontFamily: "'Caveat', serif" }}>
                            <span>Discover</span>
                            <span>&</span>
                            <span>Elevate</span>
                        </span>
                        <span className='text-3xl max-md:text-2xl max-sm:text-2xl' style={{ fontFamily: "'Italiana', serif" }}>Your Product Hunt</span></h1>
                    <p  className='text-lg text-center max-w-sm text-gray-600 '>Your one-stop platform to explore, upvote, and share innovative products. Join our community of tech enthusiasts today!</p>
                    <Link to='/products'><button  style={{ fontFamily: "'Italiana', serif" }} className='mt-4 px-10 max-sm:px-5 py-4 bg-[#FC6B4C] font-bold text-xl text-white rounded-md hover:bg-white hover:text-[#FC6B4C] duration-500'>Start Exploring</button></Link>
                </div>

                {/* Right Side: Image Section */}
                <div className='h-full w-full flex '>
        
                     <Lottie animationData={animationBannerImg} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
