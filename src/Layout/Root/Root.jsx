import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <h2>This is Root</h2>
            <Outlet></Outlet>
            <h2>This is footer</h2>
        </div>
    );
};

export default Root;