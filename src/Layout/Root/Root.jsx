import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../Shared/NavBar/NavBar';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <h2>This is Root</h2>
            <Outlet></Outlet>
            <h2>This is footer</h2>
        </div>
    );
};

export default Root;