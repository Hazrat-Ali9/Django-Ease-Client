import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const UserDistrictAndUpazila = () => {
	const axiosCommon = useAxiosCommon();
	const { data = {}, isLoading } = useQuery({
		queryKey: ["district-upzila-hooks"],
		queryFn: async () => {
			const { data: districtsResponse } = await axiosCommon.get("/districts");
			const { data: upazilasResponse } = await axiosCommon.get("/upazilas");
			const districts = districtsResponse[0]?.data;
			const upazilas = upazilasResponse[0]?.data;
			// console.log(districts, upazilas);
			return { districts, upazilas };
		},
	});

	const { districts, upazilas } = data;
	// console.log(districts, upazilas);
	return { districts, upazilas, isLoading };
};

export default UserDistrictAndUpazila;
