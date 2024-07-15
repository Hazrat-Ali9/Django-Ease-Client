import { useQuery } from "@tanstack/react-query";
import AllTestTableRow from "../../../components/dashboard/Sidebar/TableRows/AllTestTableRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

const AllTests = () => {
	const axiosSecure = useAxiosSecure();
	const {
		data: tests = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["tests"],
		queryFn: async () => {
			const { data } = await axiosSecure("/tests");
			return data;
		},
	});
	// console.log(tests);

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
					const { data } = await axiosSecure.delete(`/test/${id}`);
					console.log(data);
					if (data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your test has been deleted.",
							icon: "success",
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		});
	};

	if (isLoading) {
		<LoadingSpinner />;
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
							<AllTestTableRow
								key={test._id}
								test={test}
								refetch={refetch}
								handleTestDelete={handleTestDelete}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllTests;
