
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import DatePicker from "react-datepicker";
import { Fragment, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";

const AllTestUpdateModal = ({ setIsEditModalOpen, isOpen, test, refetch }) => {
	const axiosSecure = useAxiosSecure();
	const [startDate, setStartDate] = useState(new Date(test.date));
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		// reset,
	} = useForm();

	const onSubmit = async (data) => {
		setLoading(true);
		let testData = {
			name: data.testName,
			image: test.image,
			description: data.testDescription,
			price: parseInt(data.testPrice),
			date: startDate,
			slots: parseInt(data.testSlots),
		};
		delete testData._id;
		if (data.testImage[0]) {
			const newImage = await imageUpload(data.testImage[0]);
			testData.image = newImage;
		}
		try {
			const { data: result } = await axiosSecure.patch(
				`/test/${test._id}`,
				testData
			);
			setLoading(false);
			if (result.modifiedCount > 0) {
				toast.success("Test infomation Updated");
				refetch();
				setIsEditModalOpen(false);
			}
			console.log(result);
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

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
									Update Room Info
								</DialogTitle>
								<div className="mt-2 w-full">
									{/* Update room form */}
									<form
										onSubmit={handleSubmit(onSubmit)}
										className="max-w-sm mx-auto"
									>
										<div className="mb-5">
											<label
												htmlFor="name"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Test name
											</label>
											<input
												{...register("testName", {
													required: "Test name is required",
												})}
												type="text"
												id="name"
												defaultValue={test.name}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="name"
											/>
											{errors.testName && (
												<p className="text-red-500 text-xs mt-1">
													{errors.testName.message}
												</p>
											)}
										</div>
										<div className="mb-5">
											<label
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												htmlFor="user_avatar"
											>
												Upload Image
											</label>
											<input
												{...register("testImage")}
												className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
												aria-describedby="user_avatar_help"
												id="test-image"
												type="file"
											></input>
											{errors.TestImage && (
												<p className="text-red-500 text-xs mt-1">
													{errors.TestImage.message}
												</p>
											)}
										</div>

										<div className="mb-5">
											<label
												htmlFor="description"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Test Description
											</label>
											<input
												{...register("testDescription", {
													required: "Test description is required",
												})}
												type="text"
												id="test-description"
												defaultValue={test.description}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="description"
											/>
											{errors.testDescription && (
												<p className="text-red-500 text-xs mt-1">
													{errors.testDescription.message}
												</p>
											)}
										</div>
										<div className="mb-5">
											<label
												htmlFor="price"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Test Price
											</label>
											<input
												{...register("testPrice", {
													required: "Test price is required",
												})}
												type="number"
												id="test-price"
												defaultValue={test.price}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="Price"
											/>
											{errors.testPrice && (
												<p className="text-red-500 text-xs mt-1">
													{errors.testPrice.message}
												</p>
											)}
										</div>
										<div className="mb-5">
											<label
												htmlFor="price"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Test Date
											</label>
											<DatePicker
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												selected={startDate}
												onChange={(date) => setStartDate(date)}
											/>
										</div>
										<div className="mb-5">
											<label
												htmlFor="slots"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Test Slots
											</label>
											<input
												{...register("testSlots", {
													required: "Slots are required",
												})}
												type="number"
												id="test-slots"
												defaultValue={test.slots}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												placeholder="slots"
											/>
											{errors.testSlots && (
												<p className="text-red-500 text-xs mt-1">
													{errors.testSlots.message}
												</p>
											)}
										</div>

										<button
											type="submit"
											disabled={loading}
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											{loading ? (
												<TbFidgetSpinner className="animate-spin m-auto" />
											) : (
												"Update Test"
											)}
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

AllTestUpdateModal.propTypes = {
	setIsEditModalOpen: PropTypes.func,
	isOpen: PropTypes.bool,
	test: PropTypes.object,
	refetch: PropTypes.func,
};

export default AllTestUpdateModal;
