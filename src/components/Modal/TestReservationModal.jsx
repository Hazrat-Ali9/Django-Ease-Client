import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogPanel,
	DialogTitle,
	Textarea,
} from "@headlessui/react";
import { Fragment } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TestReservationModal = ({ setIsEditModalOpen, isOpen, app, refetch }) => {
	const { register, handleSubmit } = useForm();
	const axiosSecure = useAxiosSecure();
	const onSubmit = async (data) => {
		const report = data.report;
		const testResult = {
			result: report,
			resultDeliveryDate: new Date(),
		};
		console.log(report, testResult);
		try {
			const { data: result } = await axiosSecure.patch(
				`/report-submit/${app.user.email}/${app._id}`,
				testResult
			);
			console.log(result);
			if (result.modifiedCount > 0) {
				refetch();
				toast.success("Report Submitted");
				setIsEditModalOpen(false);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
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
										Submit User Report
									</DialogTitle>
									<div className="mt-2 w-full">
										{/* Submt User Report form */}
										<form
											onSubmit={handleSubmit(onSubmit)}
											className="max-w-sm mx-auto"
										>
											<div className="mb-5">
												<label
													htmlFor="report"
													className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
												>
													Test Report
												</label>
												<Textarea
													{...register("report")}
													type="text"
													id="report"
													rows={3}
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
													placeholder="Link or text"
													required
												/>
											</div>
											<button
												type="submit"
												className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
											>
												Report Submit
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
		</div>
	);
};

TestReservationModal.propTypes = {
	setIsEditModalOpen: PropTypes.func,
	isOpen: PropTypes.bool,
	app: PropTypes.object,
	refetch: PropTypes.func,
};

export default TestReservationModal;
