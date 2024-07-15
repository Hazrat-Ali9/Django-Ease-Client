import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { bloodGroup } from "./bloodGroupData";
import DistrictAndUpazila from "./DistrictAndUpazila";
import { imageUpload } from "../../api/utils";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { Link, useNavigate } from "react-router-dom";
import UserDistrictAndUpazila from "../../hooks/UserDistrictAndUpazila";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
const Register = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const { createUser, updateUserProfile } = useAuth();
	const { districts, upazilas, isLoading } = DistrictAndUpazila();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	UserDistrictAndUpazila();
	const axiosCommon = useAxiosCommon();

	const onSubmit = async (data) => {
		setLoading(true);
		const name = data.name;
		const email = data.email;
		const password = data.password;
		const image = data.image[0];
		const bloodGroup = data.bloodGroup;
		const district = data.district;
		const upazila = data.upazila;
		const status = "active";
		const role = "user";
		let userData = {
			name,
			email,
			bloodGroup,
			district,
			upazila,
			status,
			role,
		};

		try {
			const result = await createUser(email, password);
			console.log(result);
			const avatar = await imageUpload(image);
			userData["avatar"] = avatar;
			console.log(userData);
			await updateUserProfile(name, avatar);
			const { data } = await axiosCommon.post("/user", userData);
			console.log(data);
			if (data.insertedId) {
				setLoading(false);
				toast.success(`Welcome ${result.user.displayName}`);
				navigate("/");
			}
		} catch (err) {
			setLoading(false);
			toast.error(err.message);
			console.log(err);
		}
	};
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
				<div className="mb-5">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your email
					</label>
					<input
						{...register("email", { required: "Email is required" })}
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="email"
						// required
					/>
					{errors.email && (
						<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your name
					</label>
					<input
						{...register("name", { required: "Name is required" })}
						type="text"
						id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="name"
						// required
					/>
					{errors.name && (
						<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="user_avatar"
					>
						Upload file
					</label>
					<input
						{...register("image", { required: "Image is required" })}
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						aria-describedby="user_avatar_help"
						id="user_avatar"
						type="file"
						// required
					></input>
					{errors.image && (
						<p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="blood-group"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Select your blood group
					</label>
					<select
						{...register("bloodGroup", { required: "Blood Group is required" })}
						id="blood-group"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						{bloodGroup.map((bg) => (
							<option key={bg.id} value={bg.type}>
								{bg.type}
							</option>
						))}
					</select>
					{errors.bloodGroup && (
						<p className="text-red-500 text-xs mt-1">
							{errors.bloodGroup.message}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="district"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Select your District
					</label>
					<select
						{...register("district", { required: "District is required" })}
						id="district"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						{districts.map((district) => (
							<option key={district.id} value={district.name}>
								{district.name}
							</option>
						))}
					</select>
					{errors.district && (
						<p className="text-red-500 text-xs mt-1">
							{errors.district.message}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="upazila"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Select your Upazila
					</label>
					<select
						{...register("upazila", { required: "Upazila is required" })}
						id="upazila"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						{upazilas.map((upzila) => (
							<option key={upzila.id} value={upzila.name}>
								{upzila.name}
							</option>
						))}
					</select>
					{errors.upazila && (
						<p className="text-red-500 text-xs mt-1">
							{errors.upazila.message}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your password
					</label>
					<input
						{...register("password", { required: "Password is required" })}
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						// required
					/>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="mb-5">
					<label
						htmlFor="confirm-password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Confirm Password
					</label>
					<input
						{...register("confirmPassword", {
							required: "Please confirm your password",
							validate: (value) =>
								value === watch("password") || "Passwords do not match",
						})}
						type="password"
						id="confirm-password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						// required
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 text-xs mt-1">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{loading ? (
						<TbFidgetSpinner className="animate-spin m-auto" />
					) : (
						"Register"
					)}
				</button>
				<div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
					Already Have an Account?{" "}
					<Link
						to={"/login"}
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Register;
