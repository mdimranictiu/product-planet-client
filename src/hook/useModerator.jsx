import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import UseAxiosSecure from "./useAxiosSecure/UseAxiosSecure";


const useModerator = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const [moderator, setModerator] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/users/moderator/${user.email}`)
                .then((res) => setModerator(res.data))
                .catch((error) => console.log("moderator error", error));
        }
    }, [user?.email, axiosSecure]);

    return moderator;
};

export default useModerator;
