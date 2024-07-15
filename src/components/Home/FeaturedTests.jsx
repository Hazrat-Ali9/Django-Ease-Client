import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "../Shared/LoadingSpinner";
import TestCard from "../dashboard/Home/TestCard";

const FeaturedTests = () => {
	const axiosCommon = useAxiosCommon();
	const { data: tests = [], isLoading } = useQuery({
		queryKey: ["featuredtests"],
		queryFn: async () => {
			const { data } = await axiosCommon("/featured-tests");
			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner />;
	}
	// console.log(tests);
	return (
		<>
			<h2 className="text-4xl text-center my-10 font-extrabold dark:text-white">
				Our Most Popular Tests
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto">
				{tests.map((test) => (
					<TestCard key={test._id} test={test}></TestCard>
				))}
			</div>
		</>
	);
};

export default FeaturedTests;
