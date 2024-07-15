import PropTypes from "prop-types";
import AllTestUpdateModal from "../../../Modal/AllTestUpdateModal";
import { useState } from "react";

const AllTestTableRow = ({ test, refetch, handleTestDelete }) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	return (
		<>
			<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
					<button
						onClick={() => setIsEditModalOpen(true)}
						className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						type="button"
					>
						Update
					</button>
					<AllTestUpdateModal
                        key={test._id}
                        isOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        test={test}
                        refetch={refetch}
                    />
				</td>
				<td className="px-6 py-4 text-right">
					<button
						onClick={() => handleTestDelete(test._id)}
						className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
						type="button"
					>
						Delete
					</button>
				</td>
			</tr>
		</>
	);
};
AllTestTableRow.propTypes = {
	test: PropTypes.object,
	refetch: PropTypes.func,
	handleTestDelete: PropTypes.func,
};

export default AllTestTableRow;
