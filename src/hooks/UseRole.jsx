import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data={}, isLoading } = useQuery({
		queryKey: ["role", user?.email],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure(`/user/${user?.email}`);
			return data;
		},
	});
	const { role, status } = data;
	console.log(role, status);

	//   Fetch user info using logged in user email

	return { role, status, isLoading };
};

export default useRole;
