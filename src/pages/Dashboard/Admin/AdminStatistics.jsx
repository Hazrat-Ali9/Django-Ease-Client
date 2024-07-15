import { useQuery } from "@tanstack/react-query";
import DeliveryRatioPieChart from "../../../components/dashboard/Sidebar/StatisticsCharts/DeliveryRatioPieChart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import MostlyBookedChart from "../../../components/dashboard/Sidebar/StatisticsCharts/MostlyBookedChart";

const AdminStatistics = () => {
	const axiosSecure = useAxiosSecure();
	const { data: adminStat = {}, isLoading } = useQuery({
		queryKey: ["AdminStatistics"],
		queryFn: async () => {
			const { data } = await axiosSecure("/admin-stat");
			return data;
		},
	});
	if (isLoading) {
		return <LoadingSpinner />;
	}
	// console.log(adminStat.deliverySatusChartData);
	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<MostlyBookedChart data={adminStat?.mostlyBookedChartData} />
				<DeliveryRatioPieChart data={adminStat?.deliverySatusChartData} />
			</div>
		</div>
	);
};

export default AdminStatistics;
