import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import TestCard from "../../../components/dashboard/Home/TestCard";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

const Tests = () => {
	const axiosCommon = useAxiosCommon();
	const [startDate, setStartDate] = useState(new Date());
	const [itemsPerPage, setItemsPerPage] = useState(3);
	const [currentPage, setCurrentPage] = useState(1);
	// let filterDate = "";
	const [filterDate, setFilterDate] = useState("");

	const handlePaginationButton = (value) => {
		console.log(value);
		setCurrentPage(value);
	};

	const handleFilter = (e) => {
		e.preventDefault();
		setFilterDate(startDate.toISOString());
		setCurrentPage(1);
		refetch();
	};

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["Available-tests", currentPage, itemsPerPage, filterDate],
		queryFn: async () => {
			const { data } = await axiosCommon(
				`/available-tests?filterDate=${filterDate}&page=${currentPage}&size=${itemsPerPage}`
			);
			return data;
		},
	});
	const handleReset = () => {
		setFilterDate("");
		setCurrentPage(1);
		refetch();
	};
	useEffect(() => {
		refetch();
	}, [filterDate, currentPage, itemsPerPage, refetch]);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	const { data: tests = [], totalTests } = data || {};
	const numberOfPages = Math.ceil(totalTests / itemsPerPage);
	const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);
	return (
		<div>
			<div className="flex items-center justify-center mx-auto">
				<form onSubmit={handleFilter}>
					<DatePicker
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						selected={startDate}
						onChange={(date) => setStartDate(date)}
					/>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto ml-4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Apply Filter
					</button>
					<a
						onClick={handleReset}
						className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
					>
						Reset
					</a>
				</form>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
				{tests.map((test) => (
					<TestCard key={test._id} test={test} />
				))}
			</div>
			<div className="flex justify-center mt-12">
				{/* Previous Button */}
				<button
					disabled={currentPage === 1}
					onClick={() => {
						handlePaginationButton(currentPage - 1);
					}}
					className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
				>
					<div className="flex items-center -mx-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mx-1 rtl:-scale-x-100"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M7 16l-4-4m0 0l4-4m-4 4h18"
							/>
						</svg>

						<span className="mx-1">previous</span>
					</div>
				</button>
				{/* Numbers */}
				{pages.map((btnNum) => (
					<button
						onClick={() => {
							handlePaginationButton(btnNum);
						}}
						key={btnNum}
						className={`hidden ${
							currentPage === btnNum ? "bg-blue-500 text-white" : ""
						} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
					>
						{btnNum}
					</button>
				))}
				{/* Next Button */}
				<button
					disabled={currentPage === numberOfPages}
					onClick={() => {
						handlePaginationButton(currentPage + 1);
					}}
					className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
				>
					<div className="flex items-center -mx-1">
						<span className="mx-1">Next</span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mx-1 rtl:-scale-x-100"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
};

export default Tests;
