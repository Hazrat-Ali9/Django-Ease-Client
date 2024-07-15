import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

const UserAppointments = () => {
	const axiosSecure = useAxiosSecure();

	const { user } = useAuth();
	const {
		data: tests = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["upcomming-tests"],
		queryFn: async () => {
			const { data } = await axiosSecure(
				`/upcomming-appointments/${user.email}`
			);
			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner/>;
	}
	const handleTestDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const { data } = await axiosSecure.delete(`/booking/${id}`);
					console.log(data);
					if (data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your Appointment has been cancled.",
							icon: "success",
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		});
	};
	return (
		<div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Test Name
							</th>
							<th scope="col" className="px-6 py-3">
								Test Description
							</th>
							<th scope="col" className="px-6 py-3">
								Test Price
							</th>
							<th scope="col" className="px-6 py-3">
								Test Date
							</th>
							<th scope="col" className="px-6 py-3">
								Test Status
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Cancle</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{tests.map((test) => (
							<tr
								key={test._id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									{test.testData.name}
								</th>
								<td className="px-6 py-4">{test.testData.description}</td>
								<td className="px-6 py-4">{test.testData.price}</td>
								<td className="px-6 py-4">
									{new Date(test.testData.date).toLocaleDateString()}
								</td>
								<td className="px-6 py-4">{test.status}</td>
								<td className="px-6 py-4 text-right">
									<button
										onClick={() => handleTestDelete(test._id)}
										className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
										type="button"
									>
										Cancle
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserAppointments;
