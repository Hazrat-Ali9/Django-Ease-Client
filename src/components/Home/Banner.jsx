import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { Link } from "react-router-dom";

const Banner = () => {
	const axiosCommon = useAxiosCommon();
	const { data: banner = {}, isLoading } = useQuery({
		queryKey: ["Active-banner"],
		queryFn: async () => {
			const { data } = await axiosCommon.get("/active-banner");
			return data;
		},
	});
	// console.log(banner);
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>
			<section
				className={`bg-cover bg-center bg-no-repeat  bg-gray-500 bg-blend-multiply`}
				style={{
					backgroundImage: `url(${banner.image})`,
					// backgroundSize: "100%",
				}}
			>
				<div className="flex flex-col lg:flex-row justify-between px-4 mx-auto max-w-screen-xl py-10 lg:py-56">
					<div>
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white text-center md:text-5xl lg:text-6xl">
							{banner.title}
						</h1>
						<p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-8 lg:px-16">
							{banner.text}
						</p>
						<div className="flex items-center justify-center">
							<Link
								to={"/tests"}
								className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
							>
								All Tests
								<svg
									className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
							</Link>
						</div>
					</div>
					<div className="lg:absolute lg:right-60 mt-4 flex flex-col items-center justify-center">
                        <p className="text-white font-medium text-xl lg:text-2xl mb-4 text-center ">Apply Coupon Code</p>
						<p className="inline-flex justify-center  lg:text-3xl font-bold items-center py-3 px-5  text-center text-white rounded-lg border border-white ">
							{banner.couponCode}
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Banner;
