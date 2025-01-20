import React from 'react';
import bannerImg from '../../../src/assets/image/banner.png'
import animationBannerImg from '../../assets/image/Animation - 1737349108207.json'
import Lottie from 'lottie-react';

const Banner = () => {
    return (
        <div className='w-4/5  mx-auto rounded-lg p-10  mt-5 py-6'>
            <div className='flex max-md:flex-col flex-row max-sm:flex-col-reverse gap-20  items-center'>
                <div className='h-full flex gap-5 flex-col items-center justify-center w-full p-6 text-black text-center '>
                    <h1 className='text-6xl font-bold '>
                        <span className='flex flex-col gap-2 mb-2 text-[#FC6B4C] ' style={{ fontFamily: "'Caveat', serif" }}>
                            <span>Discover</span>
                            <span>&</span>
                            <span>Elevate</span>
                        </span>
                        <span className='text-3xl' style={{ fontFamily: "'Italiana', serif" }}>Your Product Hunt</span></h1>
                    <p  className='text-lg text-center max-w-sm text-gray-600 mt-10'>Your one-stop platform to explore, upvote, and share innovative products. Join our community of tech enthusiasts today!</p>
                    <button  style={{ fontFamily: "'Italiana', serif" }} className='mt-4 px-10 py-4 bg-[#FC6B4C] font-bold text-xl text-white rounded-md hover:bg-[#FC6B4C]'>Start Exploring</button>
                </div>

                {/* Right Side: Image Section */}
                <div className='h-full w-full flex '>
                    {/* <img 
                        src={bannerImg}
                        alt='Product Hunting' 
                        className='max-w-full  rounded-md' 
                    /> */}
                     <Lottie animationData={animationBannerImg} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
