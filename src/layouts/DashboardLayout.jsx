import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar/Sidebar";
import useAuth from "../hooks/useAuth";

import Lottie from "lottie-react";
import loadingAnimation from "./loadingSpinner.json";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
// import SideNav from "../components/dashboard/Sidebar/SideNav";
const style = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
};

const DashboardLayout = () => {
	const { status, isLoading } = useRole();
	const { loading } = useAuth();

	if (loading) {
		return (
			<>
				<Lottie animationData={loadingAnimation} style={style} />
			</>
		);
	}

	if (status === "blocked") {
		return (
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center md:text-5xl lg:text-6xl dark:text-white">
				Blocked user Cannot Access dashboard
			</h1>
		);
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className="relative min-h-screen md:flex">
			{/* Sidebar */}
			<Sidebar />
			{/* <SideNav></SideNav> */}

			{/* Outlet --> Dynamic content */}
			<div className="flex-1 md:ml-64">
				<div className="p-5">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
