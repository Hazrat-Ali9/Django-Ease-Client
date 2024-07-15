import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TestReservationModal from "../../../Modal/TestReservationModal";
import PropTypes from "prop-types";

const TestReservationsRow = ({ app, refetch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const axiosSecure = useAxiosSecure();
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
							text: "Appointments has been canceled.",
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
		<>
			<tr
				key={app._id}
				className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
			>
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{app.user.name}
				</th>
				<td className="px-6 py-4">{app.user.email}</td>
				<td className="px-6 py-4">{app.testData.name}</td>
				<td className="px-6 py-4">{app.testData.price}</td>
				<td className="px-6 py-4">
					{new Date(app.testData.date).toLocaleDateString()}
				</td>
				<td className="px-6 py-4">{app.status}</td>
				<td className="px-6 py-4">
					<button
						onClick={() => setIsOpen(true)}
						disabled={app.status === "delivered" ? true : false}
						className={`block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
							app.status === "delivered" ? "opacity-50 cursor-not-allowed" : ""
						}`}
						type="button"
					>
						Submit Report
					</button>
					<TestReservationModal
						key={app._id}
						isOpen={isOpen}
						setIsEditModalOpen={setIsOpen}
						app={app}
						refetch={refetch}
					/>
				</td>
				<td className="px-6 py-4 text-right">
					<button
						onClick={() => handleTestDelete(app._id)}
						disabled={app.status === "delivered" ? true : false}
						className={`block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
							app.status === "delivered" ? "opacity-50 cursor-not-allowed" : ""
						}`}
						type="button"
					>
						Cancle
					</button>
				</td>
			</tr>
		</>
	);
};

TestReservationsRow.propTypes = {
	app: PropTypes.object,
	refetch: PropTypes.func,
};

export default TestReservationsRow;
