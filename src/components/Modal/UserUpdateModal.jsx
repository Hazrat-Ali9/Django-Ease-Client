import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { bloodGroup } from "../../pages/Register/bloodGroupData";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserDistrictAndUpazila from "../../hooks/UserDistrictAndUpazila";
import toast from "react-hot-toast";

const UserUpdateModal = ({ setIsEditModalOpen, isOpen, user, refetch }) => {
	const axiosSecure = useAxiosSecure();
	const { districts, upazilas, isLoading } = UserDistrictAndUpazila();
	const { register, handleSubmit } = useForm();
	const onSubmit = async (data) => {
		const status = data.status;
		const role = data.role;
		let userData = {
			...user,
			status,
			role,
		};
		delete userData._id;
		try {
			const { data } = await axiosSecure.patch(`/user/${user?._id}`, userData);
			console.log(data);
			if (data.modifiedCount > 0) {
				refetch();
				toast.success("Successfully Updated");
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => setIsEditModalOpen(false)}
			>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<DialogTitle
									as="h3"
									className="text-lg font-medium text-center leading-6 text-gray-900"
								>
									Update User Info
								</DialogTitle>
								<div className="mt-2 w-full">
									{/* Update room form */}
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="max-w-sm mx-auto"
									>
										<img
											className="mx-auto w-24 h-24 mb-3 rounded-full shadow-lg"
											src={user.avatar}
											alt="Bonnie image"
										/>
										<div className="mb-5">
											<label
												htmlFor="email"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User email
											</label>
											<input
												{...register("email")}
												type="email"
												id="email"
												disabled
												defaultValue={user.email}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="name@flowbite.com"
												required
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="name"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User name
											</label>
											<input
												// {...register("name")}
												type="text"
												id="name"
												disabled
												value={user.name}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="name"
												required
											/>
										</div>
										{/* <div className="mb-5">
											<label
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												htmlFor="user_avatar"
											>
												Upload file
											</label>
											<input
												{...register("image")}
                                                disabled
												className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
												aria-describedby="user_avatar_help"
												id="user_avatar"
												type="file"
											></input>
										</div> */}
										<div className="mb-5">
											<label
												htmlFor="user_avatar"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User Image URL
											</label>
											<input
												// {...register("image")}
												type="text"
												id="avatar"
												disabled
												value={user.avatar}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Image"
												required
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="blood-group"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User blood group
											</label>
											<select
												// {...register("bloodGroup")}
												id="blood-group"
												disabled
												defaultValue={user?.bloodGroup}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												{bloodGroup.map((bg) => (
													<option key={bg.id} value={bg.type}>
														{bg.type}
													</option>
												))}
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="district"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User District
											</label>
											<select
												// {...register("district")}
												id="district"
												disabled
												defaultValue={user?.district}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												{districts.map((district) => (
													<option key={district.id} value={district.name}>
														{district.name}
													</option>
												))}
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="upazila"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User Upazila
											</label>
											<select
												// {...register("upazila")}
												id="upazila"
												disabled
												defaultValue={user?.upazila}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												{upazilas.map((upzila) => (
													<option key={upzila.id} value={upzila.name}>
														{upzila.name}
													</option>
												))}
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="upazila"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User Status
											</label>
											<select
												{...register("status")}
												id="status"
												defaultValue={user.status}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option value="active">Active</option>
												<option value="blocked">Blocked</option>
											</select>
										</div>
										<div className="mb-5">
											<label
												htmlFor="role"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												User Role
											</label>
											<select
												{...register("role")}
												id="role"
												defaultValue={user.role}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											>
												<option value="user">User</option>
												<option value="admin">admin</option>
											</select>
										</div>

										<button
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Update
										</button>
									</form>
								</div>
								<hr className="mt-8 " />
								<div className="mt-2 ">
									<button
										type="button"
										className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
										onClick={() => setIsEditModalOpen(false)}
									>
										Cancel
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

UserUpdateModal.propTypes = {
	setIsEditModalOpen: PropTypes.func,
	isOpen: PropTypes.bool,
	user: PropTypes.object,
	refetch: PropTypes.func
};

export default UserUpdateModal;
