import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookNowFormModal from "../../../components/Modal/BookNowFormModal";
import { useState } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import toast from "react-hot-toast";
// import useRole from "../../../hooks/UseRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const TestDetails = () => {
	const axiosSecure = useAxiosSecure();
	const axiosCommon = useAxiosCommon();
	const [isOpen, setIsOpen] = useState(false);
	const [appliedCoupon, setAppliedCoupon] = useState(false);
	const [discountedPrice, setDiscountedPrice] = useState(0);
	const { user: currentUser, loading } = useAuth();
	const { id } = useParams();

	const {
		data: test = {},
		isLoading: testLoading,
		refetch,
	} = useQuery({
		queryKey: ["test", id],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/test/${id}`);
			return data;
		},
	});
	const { data: user = {}, isLoading: userLoading } = useQuery({
		queryKey: ["users", currentUser.email],
		enabled: !loading,
		queryFn: async () => {
			const { data } = await axiosSecure(`/user/${currentUser.email}`);
			// console.log(data);
			return data;
		},
	});

	const { data: banner = {}, isLoading } = useQuery({
		queryKey: ["Active-banner"],
		queryFn: async () => {
			const { data } = await axiosCommon.get("/active-banner");
			return data;
		},
	});
	const closeModal = () => {
		setIsOpen(false);
	};
	const handleCoupon = (e) => {
		e.preventDefault();
		const form = e.target;
		const coupon = form.couponCode.value;
		if (appliedCoupon) {
			return toast.error("Coupon Already Applied");
		}
		const discount_percentage = banner.discountRate / 100;
		const original_price = test.price;
		if (coupon === banner.couponCode) {
			const discounted_price = original_price * (1 - discount_percentage);
			setDiscountedPrice(discounted_price);
			test.price = discounted_price;
			toast.success("Coupon Applied");
			setAppliedCoupon(true);
		} else {
			toast.error("Invalid Coupon Code");
		}
		console.log(test);
	};

	if (isLoading || loading || userLoading || testLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<Banner>
				<div className="flex w-full justify-between border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-700">
					<div className="mx-auto flex items-center">
						<p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
							<MdAnnouncement className="mr-4 h-4 w-4" />
							<span className="[&_p]:inline">
								{`${banner.title}. Apply Coupon Code "${banner.couponCode}" to get %${banner.discountRate} discount`}
							</span>
						</p>
					</div>
					<Banner.CollapseButton
						color="gray"
						className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
					>
						<HiX className="h-4 w-4" />
					</Banner.CollapseButton>
				</div>
			</Banner>
			<div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<div>
					<img
						className="rounded-t-lg  object-cover w-full h-full"
						src={test.image}
						alt=""
					/>
				</div>
				<div className="p-5 flex flex-col justify-between items-center">
					{/* Top Information */}
					<div>
						<div>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{test.name}
							</h5>
						</div>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							{test.description}
						</p>
						<p className="mb-3 font-semibold text-gray-700 dark:text-gray-400">
							Appointment Date: {new Date(test.date).toLocaleDateString()}
						</p>
						<div className="my-4">
							<span className="bg-blue-100 text-blue-800 text-base font-semibold px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-800">
								{discountedPrice
									? `Discounted Price: ${discountedPrice}`
									: `Price: ${test.price}`}
							</span>
							<span className="bg-red-100 text-red-800 text-base font-semibold px-2.5 py-1 rounded dark:bg-red-200 dark:text-red-800 ml-4">
								Available Slots: {test.slots}
							</span>
						</div>
						<div>
							<form
								onSubmit={handleCoupon}
								className="w-full max-w-md flex items-center "
							>
								<Field>
									<Label className="text-base font-medium ">Apply Coupon</Label>
									{/* <Description className="text-sm/6 text-white/50">
										Use your real name so people will recognize you.
									</Description> */}
									<Input
										className={clsx(
											"mt-3 block w-full rounded-lg border-none bg-blue-100 py-1.5 px-3 text-sm/6 text-black",
											"focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
										)}
										id="couponCode"
										placeholder="Coupon Code"
									/>
								</Field>
								<button
									className={`inline-flex items-center mt-8 ml-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
										test.slots < 1 || user.status === "blocked"
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
								>
									Apply Now
								</button>
							</form>
						</div>
					</div>
					{/* Bottom Button */}
					<div>
						<Elements stripe={stripePromise}>
							{/* checkout form */}
							<BookNowFormModal
								bookingInfo={{
									testData: {
										...test,
									},
									user: {
										...user,
									},
									result: "",
									status: "pending",
								}}
								isOpen={isOpen}
								closeModal={closeModal}
								refetch={refetch}
							/>
						</Elements>
						<button
							onClick={() => {
								if (test.slots < 1) {
									return toast.error("No slots Available");
								}
								if (user.status === "blocked") {
									return toast.error("Blocked User");
								}
								setIsOpen(true);
							}}
							disabled={test.slots < 1 ? true : false}
							className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
								test.slots < 1 || user.status === "blocked"
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
						>
							Book Now
							<svg
								className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestDetails;
