import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const AddATest = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [startDate, setStartDate] = useState(new Date());
	const axiosSecure = useAxiosSecure();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const image = data.testImage[0];
			const testImage = await imageUpload(image);
			const newTest = {
				name: data.testName,
				image: testImage,
				description: data.testDescription,
				price: parseInt(data.testPrice),
				date: startDate,
				slots: parseInt(data.testSlots),
			};
			console.log(newTest);
			const { data: result } = await axiosSecure.post("/test", newTest);
			if (result.insertedId) {
				toast.success("Test Uploaded Successfully");
				setIsLoading(false);
				navigate("/dashboard/all-tests");
				reset();
			}
		} catch (err) {
			setIsLoading(false);
			console.log(err);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
				<div className="mb-5">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Test name
					</label>
					<input
						{...register("testName", { required: "Test name is required" })}
						type="text"
						id="name"
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
						{...register("testImage", { required: "Test image is required" })}
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
						{...register("testPrice", { required: "Test price is required" })}
						type="number"
						id="test-price"
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
						{...register("testSlots", { required: "Slots are required" })}
						type="number"
						id="test-slots"
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
					disabled={isLoading}
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{isLoading ? (
						<TbFidgetSpinner className="animate-spin m-auto" />
					) : (
						"Upload Test"
					)}
				</button>
			</form>
		</div>
	);
};

export default AddATest;
