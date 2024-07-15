// import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { FaUserEdit, FaChartLine, FaUserLock } from "react-icons/fa";
import { GrDocumentTest, GrTest } from "react-icons/gr";
import { TbReportSearch } from "react-icons/tb";
import { LuImagePlus } from "react-icons/lu";
import { PiFlagBannerFoldFill } from "react-icons/pi";

const AdminMenu = () => {
	return (
		<>
			<MenuItems
				address="statistics"
				label="Statistics"
				icon={FaChartLine}
			></MenuItems>
			<MenuItems
				address="manage-users"
				label="All Users"
				icon={FaUserLock}
			></MenuItems>
			<MenuItems
				address="add-a-test"
				label="Add a test"
				icon={GrDocumentTest}
			></MenuItems>
			<MenuItems
				address="all-tests"
				label="All tests"
				icon={GrTest}
			></MenuItems>
			<MenuItems
				address="all-reservations"
				label="Reservation"
				icon={TbReportSearch}
			></MenuItems>
			<MenuItems
				address="add-banner"
				label="Add banner"
				icon={LuImagePlus}
			></MenuItems>
			<MenuItems
				address="all-banners"
				label="All Banners"
				icon={PiFlagBannerFoldFill}
			></MenuItems>
			<MenuItems
				address="user-profile"
				label="My Profile"
				icon={FaUserEdit}
			></MenuItems>
		</>
	);
};

export default AdminMenu;
