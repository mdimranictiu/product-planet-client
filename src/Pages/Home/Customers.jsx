import React from 'react';
import CountUp from "react-countup";
import montlyviews from '../../assets/image/montlyViews.png';
import subscribenewsletter from '../../assets/image/subscribe-newsletter.jpg';
import happyClients from '../../assets/image/happyClients.jpg';
import prize from '../../assets/image/prize.png';

const Customers = () => {
    const stats = [
        { img: subscribenewsletter, count: 320, label: "Subscribers" },
        { img: montlyviews, count: 110, label: "Monthly Views" },
        { img: happyClients, count: 60, label: "Happy Clients" },
        { img: prize, count: 10, label: "Awards" },
    ];

    return (
        <div className="py-10 w-4/5 max-sm:w-full max-md:w-full mx-auto px-10">
            <h2 className="text-center font-bold text-3xl py-10">Find new customers</h2>
            <div className='max-w-2xl mx-auto'>
                <p className='text-center'>
                    Product Planet advertising reaches millions of the world's most prominent techies and early adopters, increasing product awareness, trials, and usage.
                </p>
            </div>
            <div className="my-10 px-5">
                <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative h-[250px] bg-cover bg-center rounded-lg"
                            style={{ backgroundImage: `url(${stat.img})` }}
                        >
                            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                            <div className="absolute inset-0 flex justify-center items-center text-center text-white">
                                <div>
                                    <h2 className="font-bold text-2xl">
                                        <CountUp end={stat.count} duration={4.5} />+
                                    </h2>
                                    <h3 className="text-xl font-bold">{stat.label}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Customers;
