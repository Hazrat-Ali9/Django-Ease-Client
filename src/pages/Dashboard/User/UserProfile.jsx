import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { bloodGroup } from "../../Register/bloodGroupData";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { TbFidgetSpinner } from "react-icons/tb";

const UserProfile = () => {
	const axiosSecure = useAxiosSecure();
	const axiosCommon = useAxiosCommon();
	const [loading, setLoading] = useState(false);
	const { data = {}, isLoading } = useQuery({
		queryKey: ["district-upzila-userprofile"],
		queryFn: async () => {
			const { data: districtsResponse } = await axiosCommon.get("/districts");
			const { data: upazilasResponse } = await axiosCommon.get("/upazilas");
			const districts = districtsResponse[0]?.data;
			const upazilas = upazilasResponse[0]?.data;
			return { districts, upazilas };
		},
	});
	const { districts, upazilas } = data;

	const { user: currentUser } = useAuth();
	const { register, handleSubmit } = useForm();
	const { data: user = {}, refetch } = useQuery({
		queryKey: ["users", currentUser.email],
		queryFn: async () => {
			const { data } = await axiosSecure(`/user/${currentUser.email}`);
			// console.log(data);
			return data;
		},
	});

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const onSubmit = async (data) => {
		setLoading(true);
		console.log(data);
		let userData = {
			name: data.name,
			bloodGroup: data.bloodGroup,
			district: data.district,
			upazila: data.upazila,
		};
		if (data.image[0]) {
			const newImage = await imageUpload(data.image[0]);
			userData.avatar = newImage;
		}
		console.log(userData);
		try {
			const { data: result } = await axiosSecure.patch(
				`/user/${user._id}`,
				userData
			);
			setLoading(false);
			if (result.modifiedCount > 0) {
				toast.success("Information Updated");
				refetch();
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	return (
		<div>
			<div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<div className="flex flex-col items-center mt-4 pb-10">
					<img
						className="w-24 h-24 mb-3 rounded-full shadow-lg"
						src={user.avatar}
						alt="Bonnie image"
					/>
					<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
						{user.name}
					</h5>
					<h5 className="mb-1 text-base  text-gray-500 dark:text-white">
						Email: {user.email}
					</h5>
					<span className="text-base text-gray-500 dark:text-gray-400">
						Role:{" "}
						<span className="bg-blue-300 py-1 px-2 text-black rounded-md">
							{user.role}{" "}
						</span>
					</span>
					<div className="mt-4 md:mt-6">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="max-w-sm md:w-96 mx-auto"
						>
							{/* <div className="mb-5">
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									User email
								</label>
								<input
									// {...register("email")}
									type="email"
									id="email"
									defaultValue={user.email}
									disabled
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@DiagnoEase.com"
									required
								/>
							</div> */}
							<div className="mb-5">
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your name
								</label>
								<input
									{...register("name")}
									type="text"
									id="name"
									defaultValue={user.name}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name"
									required
								/>
							</div>
							<div className="mb-5">
								<label
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									htmlFor="user_avatar"
								>
									Upload Image
								</label>
								<input
									{...register("image")}
									className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
									aria-describedby="user_avatar_help"
									id="user_avatar"
									type="file"
								></input>
							</div>
							<div className="mb-5">
								<label
									htmlFor="blood-group"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your blood group
								</label>
								<select
									{...register("bloodGroup")}
									id="blood-group"
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
									Your District
								</label>
								<select
									{...register("district")}
									id="district"
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
									Your Upazila
								</label>
								<select
									{...register("upazila")}
									id="upazila"
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
							<button
								type="submit"
								disabled={loading}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								{loading?(
									<TbFidgetSpinner className="animate-spin m-auto" />
								):(
									"Update"
								)}
							</button>
						</form>
						{/* <a
							href="#"
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Add friend
						</a>
						<a
							href="#"
							className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
						>
							Message
						</a> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
