import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaPinterest, FaTwitter, FaWhatsapp } from "react-icons/fa";
import UseAxiosPublic from '../../hook/useAxiosPublic/UseAxiosPublic';

const Footer = () => {
    const axiosPublic = UseAxiosPublic();
    const [success, setSuccess] = useState('');
    const [err, setErr] = useState('');
    
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        axiosPublic.post('/subscribe', { email })
            .then((res) => {
                if (res.data.insertedId) {
                    setSuccess('Successfully Subscribed!');
                    setErr('');
                } else {
                    setErr('Subscription failed. Try again.');
                    setSuccess('');
                }
            })
            .catch((error) => {
                setErr(`Failed to Subscribe: ${error.message}`);
                setSuccess('');
            });

        e.target.reset(); // Clear input after submission
    };

    useEffect(() => {
        if (success || err) {
            const timer = setTimeout(() => {
                setSuccess('');
                setErr('');
            }, 2000);
    
            return () => clearTimeout(timer); 
        }
    }, [success, err]);

    return (
        <div className='py-10 bg-[#1F2937] text-white'>
            <div className='grid grid-cols-4 max-sm:grid-cols-1 max-sm:gap-10 max-md:grid-cols-2 max-sm:w-full w-4/5 mx-auto p-10 gap-8'>
             
                <div className='flex flex-col gap-4'>
                    <h2 className='text-3xl font-extrabold '>Product Planet</h2>
                    <p className='text-gray-400'>Your gateway to discovering the latest and greatest products in the tech world. Join us on this exciting journey!</p>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold'>Contact Info</h2>
                    <p className='text-gray-300'>Head Office: Rajbari</p>
                    <p className='text-gray-300'>Email: info@productplanet.com</p>
                    <p className='text-gray-300'>Phone: +880 0121212121</p>
                </div>

                {/* Social Media Links */}
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold'>Social Media</h2>
                    <div className='gap-10 items-center grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1'>
                        <div className='flex items-center'>
                            <ul className='flex lg:flex-row max-sm:flex-row md:flex-col gap-3 text-3xl cursor-pointer'>
                                <li className='p-3 rounded-full text-blue-600 hover:bg-white hover:text-[#008575] transition-all'>
                                    <FaFacebook />
                                </li>
                                <li className='p-3 rounded-full text-blue-400 hover:bg-white hover:text-[#008575] transition-all'>
                                    <FaTwitter />
                                </li>
                                <li className='p-3 rounded-full text-green-500 hover:bg-white hover:text-[#008575] transition-all'>
                                    <FaWhatsapp />
                                </li>
                                <li className='p-3 rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-all'>
                                    <FaPinterest />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-semibold'>Subscribe to Our Newsletter</h2>
                    <p className='text-gray-400'>Stay updated with the latest product trends and news.</p>
                    <form onSubmit={handleSubscribe} className='flex flex-col gap-3'>
                        <input
                            type='email'
                            placeholder='Enter your email' 
                            name='email'
                            className='p-3 rounded bg-gray-800 text-gray-300 outline-none border border-gray-600'
                            required
                        />
                        <button
                            type='submit'
                            className='py-3 px-6 bg-[#FC6B4C] text-white font-bold rounded hover:bg-[#e55539] transition-all'
                        >
                            Subscribe
                        </button>
                        {success && <p className='text-green-500'>{success}</p>}
                        {err && <p className='text-red-500'>{err}</p>}
                    </form>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className='border-t border-gray-600 mt-8 pt-4 text-center'>
                <p className='text-gray-400'>&copy; {new Date().getFullYear()} Product Planet. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
