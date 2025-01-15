import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import gifUrl from '../../assets/image/pre.gif'

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation();
    // if loading then show a spinner
    if(loading){
        return (
            <>
             <div className="flex justify-center py-10 min-h-screen ">
            <div className="w-full max-w-xl   shadow-[32px] rounded-lg p-8">
            <img src={gifUrl} alt="Loading" className="w-full  items-center object-contain" />
                </div>
                </div>
            </>
        )
        if(user){
            return children;
        }
    }
    return (
        <div>
            <Navigate to="/login" state={location?.pathname}></Navigate>
        </div>
    );
};

export default PrivateRoute;