import axios from "axios";
// import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});
const useAxiosSecure = () => {
	const { logOut } = useAuth();
	const navigate = useNavigate();

	axiosSecure.interceptors.request.use(
		function (config) {
			const token = localStorage.getItem("access-token");
			// console.log('request stopped by interceptors', token)
			config.headers.authorization = `Bearer ${token}`;
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		}
	);
	axiosSecure.interceptors.response.use(
		function (response) {
			return response;
		},
		async (error) => {
			const status = error.response.status;
			// console.log('status error in the interceptor', status);
			// for 401 or 403 logout the user and move the user to the login
			if (status === 401 || status === 403) {
				await logOut();
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);
	// useEffect(() => {
	//   axiosSecure.interceptors.response.use(
	//     res => {
	//       return res
	//     },
	//     async error => {
	//       console.log('error tracked in the interceptor', error.response)
	//       if (error.response.status === 401 || error.response.status === 403) {
	//         await logOut()
	//         navigate('/login')
	//       }
	//       return Promise.reject(error)
	//     }
	//   )
	// }, [logOut, navigate])

	return axiosSecure;
};

export default useAxiosSecure;
