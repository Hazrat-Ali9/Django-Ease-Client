import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';

const options = {
	title: "Population of Largest U.S. Cities",
	chartArea: { width: "50%" },
	hAxis: {
		title: "Total Booked",
		minValue: 0,
	},
	vAxis: {
		title: "Tests Name",
	},
};
const MostlyBookedChart = ({ data }) => {
	return (
		<Chart
			chartType="BarChart"
			width="100%"
			height="400px"
			data={data}
			options={options}
		/>
	);
};
MostlyBookedChart.propTypes = {
    data: PropTypes.array
}

export default MostlyBookedChart;
