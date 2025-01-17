import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosSecure from "./useAxiosSecure/useAxiosSecure";


const useModerator = () => {
    const { user,loading } = useAuth();
    const axiosSecure = UseAxiosSecure();

    // Using TanStack Query
    const { data: isModerator, isPending: isModeratorLoading } = useQuery({
        queryKey: [user?.email, "isModerator"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/moderator/${user?.email}`);
            return res.data?.moderator;
        },
        // Only enable query if user email exists
    });

    return [isModerator, isModeratorLoading];
};

export default useModerator;
