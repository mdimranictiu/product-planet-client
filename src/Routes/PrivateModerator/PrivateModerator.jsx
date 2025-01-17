import { Navigate, useLocation } from "react-router-dom";
import useModerator from "../../hook/useModerator";
import useAuth from "../../hook/useAuth";


const PrivateModerator = ({ children }) => {
    const { user, loading } = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    if (loading || isModeratorLoading) {
        return <progress className="progress w-56"></progress>; // Display a loading progress bar
    }

    if (user && isModerator) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />; // Redirect to home if not a moderator
};

export default PrivateModerator;
