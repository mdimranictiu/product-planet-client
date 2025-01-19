import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./useAxiosSecure/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";


const useAdmin = () => {
    const { user,loading } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();

    // Using TanStack Query
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.admin;
        },
        // Only enable query if user email exists
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
