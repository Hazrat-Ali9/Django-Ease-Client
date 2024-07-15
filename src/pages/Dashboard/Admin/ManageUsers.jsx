import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserUpdateModalRow from "../../../components/dashboard/Sidebar/TableRows/UserUpdateModalRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageUsers = () => {
	const axiosSecure = useAxiosSecure();

	const {
		data: users = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data } = await axiosSecure("/users");
			return data;
		},
	});
    if(isLoading){
        return <LoadingSpinner/>
    }
	// console.log(users);
	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								User Name
							</th>
							<th scope="col" className="px-6 py-3">
								User Email
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">See info</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Download Details</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<UserUpdateModalRow key={user._id} user={user} refetch={refetch} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageUsers;
