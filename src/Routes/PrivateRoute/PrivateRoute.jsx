import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import gifUrl from '../../assets/image/pre.gif';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-xl shadow-lg rounded-lg p-8">
          <img
            src={gifUrl}
            alt="Loading"
            className="w-full object-contain"
          />
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }


  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
