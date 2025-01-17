import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthContext/AuthProvider';


const UserHome= () => {
const {user}=useContext(AuthContext)
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

export default UserHome;