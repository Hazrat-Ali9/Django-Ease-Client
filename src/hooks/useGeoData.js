import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

export const GeoData = async () => {
	const axiosCommon = useAxiosCommon();
	const { data = {}, isLoading } = useQuery({
		queryKey: ["district-upzila-hooks"],
		queryFn: async () => {
			const districtsResponse = await axiosCommon.get("/districts");
			const upazilasResponse = await axiosCommon.get("/upazilas");
			const districts = districtsResponse.data[2]?.data;
			const upazilas = upazilasResponse.data[2]?.data;
			// console.log(districts, upazilas);
			return { districts, upazilas };
		},
	});
	const { districts, upazilas } = data;
	console.log(districts, upazilas);
	return { districts, upazilas, isLoading };
};
