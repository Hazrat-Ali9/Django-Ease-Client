import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import TestReservationsRow from "../../../components/dashboard/Sidebar/TableRows/TestReservationsRow";

const TestReservations = () => {
	const { id: testId } = useParams();
	const axiosSecure = useAxiosSecure();

	let searchEmail = "";
	const {
		data = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["test-reservations", testId],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/appointments/${testId}?email=${searchEmail}`
			);
			return data;
		},
	});
	const handleFilter = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		searchEmail = email;
		refetch();
		console.log(email);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<form
				onSubmit={handleFilter}
				className="flex items-center justify-center mx-auto"
			>
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Search by email
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="User email address"
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Search
				</button>
			</form>
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
								Test Name
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
								<span className="sr-only">Report</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Cancle</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map((app) => (
							<TestReservationsRow key={app._id} app={app} refetch={refetch} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TestReservations;
