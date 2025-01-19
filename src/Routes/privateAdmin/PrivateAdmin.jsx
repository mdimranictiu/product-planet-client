import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useAdmin from "../../hook/useAdmin";


const PrivateAdmin = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin,isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>; // Display a loading progress bar
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />; // Redirect to home if not a moderator
};

export default PrivateAdmin;
