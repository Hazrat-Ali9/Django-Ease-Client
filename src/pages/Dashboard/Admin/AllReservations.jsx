import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";


const AllReservations = () => {
	const axiosSecure = useAxiosSecure();

	const {
		data: tests = [],
		isLoading,
		// refetch,
	} = useQuery({
		queryKey: ["tests"],
		queryFn: async () => {
			const { data } = await axiosSecure("/tests");
			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner />;
	}
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
								Test Slots
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Update</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Delete</span>
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
									{test.name}
								</th>
								<td className="px-6 py-4">{test.description}</td>
								<td className="px-6 py-4">{test.price}</td>
								<td className="px-6 py-4">
									{new Date(test.date).toLocaleDateString()}
								</td>
								<td className="px-6 py-4">{test.slots}</td>
								<td className="px-6 py-4">
									<Link
										to={`/dashboard/all-reservations/${test._id}`}
										className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										type="button"
									>
										Reservation
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			
		</div>
	);
};

export default AllReservations;
