import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";

const AllBanners = () => {
	const axiosSecure = useAxiosSecure();
	const {
		data: banners = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["Banner"],
		queryFn: async () => {
			const { data } = await axiosSecure("/banner");
			return data;
		},
	});

	const handleBannerStatus = async (id) => {
		try {
			const { data } = await axiosSecure.put(`/banner/${id}/activate`);
			console.log(data);
			if (data.modifiedCount > 0) {
				refetch();
				toast.success("Banner is activate");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleBannerDelete = async (id) => {
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
					const { data } = await axiosSecure.delete(`/banner/${id}`);
					console.log(data);
					if (data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Banner has been Deleted.",
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
								Banner Image
							</th>
							<th scope="col" className="px-6 py-3">
								Banner Title
							</th>
							<th scope="col" className="px-6 py-3">
								Banner Text
							</th>
							<th scope="col" className="px-6 py-3">
								Coupon Code
							</th>
							<th scope="col" className="px-6 py-3">
								Discount Rate
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Update</span>
							</th>
							<th scope="col" className="px-6 py-3">
								<span className="sr-only">Update</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{banners.map((banner) => (
							<tr
								key={banner._id}
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									<img
										className="max-w-48 rounded-lg"
										src={banner.image}
										alt=""
									/>
								</th>
								<td className="px-6 py-4">{banner.title}</td>
								<td className="px-6 py-4">{banner.text}</td>
								<td className="px-6 py-4">{banner.couponCode}</td>
								<td className="px-6 py-4">{banner.discountRate}</td>
								<td className="px-6 py-4">{banner.isActive.toString()}</td>
								<td className="px-6 py-4">
									<button
										onClick={() => handleBannerStatus(banner._id)}
										disabled={banner.isActive}
										className={`block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
											banner.isActive ? "opacity-50 cursor-not-allowed" : ""
										}`}
										type="button"
									>
										Make As Active
									</button>
								</td>
								<td className="px-6 py-4">
									<button
										onClick={() => handleBannerDelete(banner._id)}
										disabled={banner.isActive}
										className={`block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
											banner.isActive ? "opacity-50 cursor-not-allowed" : ""
										}`}
										type="button"
									>
										Delete
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

export default AllBanners;
