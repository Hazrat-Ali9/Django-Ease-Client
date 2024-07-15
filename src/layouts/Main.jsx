// import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";

import Lottie from "lottie-react";
import loadingAnimation from "./loadingSpinner.json";
import useAuth from "../hooks/useAuth";
import Nav from "../components/Shared/Navbar/Nav";
const style = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
};

const Main = () => {
	const { loading } = useAuth();

	if (loading) {
		return (
			<>
				<Lottie animationData={loadingAnimation} style={style} />
			</>
		);
	}

	return (
		<div>
			<Nav />
			{/* <Navbar /> */}
			<div className="pt-24 max-w-screen-xl mx-auto min-h-[calc(100vh-197px)]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
