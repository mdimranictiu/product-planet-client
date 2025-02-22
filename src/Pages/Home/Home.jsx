import React from 'react';
import gifUrl from '../../assets/image/pre.gif'
import Feature from './Feature';
import Trending from './Trending';
import Banner from './Banner';
import CouponSlider from './CouponSlider';
import ComingSoon from './ComingSoon';
import Review from './Review';
import Contact from './Contact';
import Customers from './Customers';

const Home = () => {
    document.title='Home || ProductPlanet'
    return (
       <>
       <Banner></Banner>
       <Feature></Feature>
       <Trending></Trending>
       <CouponSlider></CouponSlider>
       <ComingSoon></ComingSoon>
       <Customers></Customers>
       <Review></Review>
       <Contact></Contact>
       </>
    );
};

export default Home;