import React from 'react';
import useAuth from '../../../hook/useAuth';

const Welcome = () => {
    const {user}=useAuth();
    console.log('auth ' ,user)
    return (
        <div className='bg-[#111827] min-h-screen'>
          <div className='p-16'>
          <h2 className="text-2xl font-bold text-white">
                        Welcome back, {user?.displayName}!
            </h2>
          </div>
        </div>
    );
};

export default Welcome;