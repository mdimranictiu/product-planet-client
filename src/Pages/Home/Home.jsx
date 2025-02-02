import React from 'react';
import gifUrl from '../../assets/image/pre.gif'
import Feature from './Feature';
import Trending from './Trending';
import Banner from './Banner';
import CouponSlider from './CouponSlider';

const Home = () => {
    document.title='Home || ProductPlanet'
    return (
       <>
       <Banner></Banner>
       <Feature></Feature>
       <Trending></Trending>
       <CouponSlider></CouponSlider>
       </>
    );
};

export default Home;