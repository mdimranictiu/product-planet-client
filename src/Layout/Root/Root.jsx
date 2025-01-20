import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Shared/NavBar/NavBar';
import Footer from '../../Pages/Home/Footer';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;