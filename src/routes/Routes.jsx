import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register/Register";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import UserAppointments from "../pages/Dashboard/User/UserAppointments";
import UserTestResults from "../pages/Dashboard/User/UserTestResults";
import AddATest from "../pages/Dashboard/Admin/AddATest";
import AdminRoute from "./AdminRoute";
import AllTests from "../pages/Dashboard/Admin/AllTests";
import AllReservations from "../pages/Dashboard/Admin/AllReservations";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AddBanner from "../pages/Dashboard/Admin/AddBanner";
import AllBanners from "../pages/Dashboard/Admin/AllBanners";
import AdminStatistics from "../pages/Dashboard/Admin/AdminStatistics";
import Tests from "../pages/Common/Tests/Tests";
import TestDetails from "../pages/Common/Tests/TestDetails";
import TestReservations from "../pages/Dashboard/Admin/TestReservations";
import PrivateRoute from "./PrivateRoute";
import BMICalculator from "../pages/Common/Extra/BMICalculator";
import AboutUs from "../pages/Common/Extra/AboutUs";
import ContactUs from "../pages/Common/Extra/ContactUs";
import ErrorPage from "../pages/Common/Extra/ErrorPage";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorPage></ErrorPage>,
		element: <Main></Main>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "login",
				element: <Login></Login>,
			},
			{
				path: "register",
				element: <Register></Register>,
			},
			{
				path: "tests",
				element: <Tests></Tests>,
			},
			{
				path: "test/:id",
				element: (
					<PrivateRoute>
						<TestDetails></TestDetails>
					</PrivateRoute>
				),
			},
			{
				path: "bmi-calculator",
				element: <BMICalculator></BMICalculator>,
			},
			{
				path: "about-us",
				element: <AboutUs></AboutUs>,
			},
			{
				path: "contact-us",
				element: <ContactUs></ContactUs>,
			},
		],
	},
	{
		path: "dashboard",
		errorElement: <ErrorPage></ErrorPage>,
		element: <DashboardLayout></DashboardLayout>,
		children: [
			// user Routes
			{
				// index: true,
				path: "user-profile",
				element: (
					<PrivateRoute>
						<UserProfile></UserProfile>
					</PrivateRoute>
				),
			},
			{
				path: "user-appointments",
				element: (
					<PrivateRoute>
						<UserAppointments></UserAppointments>
					</PrivateRoute>
				),
			},
			{
				path: "user-test-results",
				element: (
					<PrivateRoute>
						<UserTestResults></UserTestResults>
					</PrivateRoute>
				),
			},
			// Admin Routes
			{
				path: "manage-users",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<ManageUsers></ManageUsers>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "add-a-test",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AddATest></AddATest>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "all-tests",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AllTests></AllTests>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "all-reservations",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AllReservations></AllReservations>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "all-reservations/:id",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<TestReservations></TestReservations>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "add-banner",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AddBanner></AddBanner>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "all-banners",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AllBanners></AllBanners>
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "statistics",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AdminStatistics></AdminStatistics>
						</AdminRoute>
					</PrivateRoute>
				),
			},
		],
	},
]);
