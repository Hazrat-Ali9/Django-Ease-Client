import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';

// export const data = [
// 	["Task", "Hours per Day"],
// 	["Work", 11],
// 	["Eat", 2],
// 	["Commute", 2],
// 	["Watch TV", 2],
// 	["Sleep", 7],
// ];

const options = {
	title: "Tests Delivery Ratio",
};

const DeliveryRatioPieChart = ({ data }) => {
	console.log(data);
	return (
		<Chart
			chartType="PieChart"
			data={data}
			options={options}
			width={"100%"}
			height={"400px"}
		/>
	);
};

DeliveryRatioPieChart.propTypes = {
    data: PropTypes.array
}

export default DeliveryRatioPieChart;
