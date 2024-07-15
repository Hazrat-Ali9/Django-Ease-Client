import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const rawImage = data.image[0];
			const imageUrl = await imageUpload(rawImage);
			const bannerData = {
				title: data.title,
				image: imageUrl,
				text: data.text,
				couponCode: data.couponCode,
				discountRate: parseInt(data.discountRate),
				isActive: false,
			};
			console.log(bannerData);
			const { data: result } = await axiosSecure.post("/banner", bannerData);
			if (result.insertedId) {
				toast.success("Banner Uploaded Successfully");
				setIsLoading(false);
				navigate("/dashboard/all-banners");
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
						htmlFor="title"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Banner title
					</label>
					<input
						{...register("title", { required: "Title is required" })}
						type="text"
						id="title"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Title"
					/>
					{errors.title && (
						<p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="Banner-image"
					>
						Banner Image
					</label>
					<input
						{...register("image", { required: "Test image is required" })}
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						aria-describedby="user_avatar_help"
						id="image"
						type="file"
					></input>
					{errors.image && (
						<p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
					)}
				</div>

				<div className="mb-5">
					<label
						htmlFor="description"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Banner Text
					</label>
					<input
						{...register("text", {
							required: "Banner Text is required",
						})}
						type="text"
						id="text"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Banner Text"
					/>
					{errors.text && (
						<p className="text-red-500 text-xs mt-1">{errors.text.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="description"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Coupon Code
					</label>
					<input
						{...register("couponCode", {
							required: "Coupon code is required",
						})}
						type="text"
						id="couponCode"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Coupon Code"
					/>
					{errors.couponCode && (
						<p className="text-red-500 text-xs mt-1">
							{errors.couponCode.message}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="discountRate"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Discount Rate
					</label>
					<input
						{...register("discountRate", {
							required: "Discount Rate is required",
							valueAsNumber: true,
							min: {
								value: 0,
								message: "Discount Rate cannot be less than 0",
							},
							max: {
								value: 100,
								message: "Discount Rate cannot be more than 100",
							},
						})}
						type="number"
						id="discountRate"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Discount Rate"
					/>
					{errors.discountRate && (
						<p className="text-red-500 text-xs mt-1">
							{errors.discountRate.message}
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

export default AddBanner;
