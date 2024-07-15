import { useState } from "react";
import UserUpdateModal from "../../../Modal/UserUpdateModal";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { handleUserAppointmentsPdf } from "../../PDF/PdfPrintUtils";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const UserUpdateModalRow = ({ user, refetch }) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const axiosSecure = useAxiosSecure();

	const { data, isLoading } = useQuery({
		queryKey: ["user-appointments", user.email],
		queryFn: async () => {
			const { data } = await axiosSecure(`/user-appointments/${user.email}`);
			return data;
		},
	});
	const handleDownloadDetails = () => {
		console.log(data);
		handleUserAppointmentsPdf(data, user);
	};

	if(isLoading){
		return <LoadingSpinner/>
	}
	return (
		<>
			<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
				<th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{user?.name}
				</th>
				<td className="px-6 py-4">{user?.email}</td>
				<td className="px-6 py-4">
					<button
						onClick={() => setIsEditModalOpen(true)}
						className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						type="button"
					>
						See info
					</button>
					<UserUpdateModal
						key={user?._id}
						isOpen={isEditModalOpen}
						setIsEditModalOpen={setIsEditModalOpen}
						user={user}
						refetch={refetch}
					/>
				</td>
				<td className="px-6 py-4 text-right">
					<button
						disabled={isLoading}
						onClick={handleDownloadDetails}
						className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
					>
						{isLoading ? "Loading...." : "Download Details"}
					</button>
				</td>
			</tr>
		</>
	);
};

UserUpdateModalRow.propTypes = {
	user: PropTypes.object,
	refetch: PropTypes.func,
};

export default UserUpdateModalRow;
