import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const { signIn, loading, setLoading } = useAuth();
	const [isloading, SetIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state || "/dashboard/user-profile";

	const onSubmit = async (data) => {
		SetIsLoading(true);
		const email = data.email;
		const password = data.password;
		try {
			const result = await signIn(email, password);
			console.log(result);
			if (!loading) {
				navigate(from);
				SetIsLoading(false);
				toast.success(`Welcome ${result.user.displayName}`);
			}
		} catch (err) {
			SetIsLoading(false);
			setLoading(false);
			toast.error(err.message);
			console.log(err);
		}
	};
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
						{...register("email")}
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="email"
						required
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Your password
					</label>
					<input
						{...register("password")}
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{isloading ? (
						<TbFidgetSpinner className="animate-spin m-auto" />
					) : (
						"Login"
					)}
				</button>
				<div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
					Not registered?{" "}
					<Link
						to={"/register"}
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						Create account
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
