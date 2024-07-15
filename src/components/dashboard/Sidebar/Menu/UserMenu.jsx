import { TbReport } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import MenuItems from "./MenuItems";

const UserMenu = () => {
	return (
		<>
			<MenuItems
				address="user-appointments"
				label="My Upcoming Appointments"
                icon={TbReport}
			></MenuItems>

			<MenuItems
				address="user-test-results"
				label="Test results"
                icon={TbReportAnalytics}
			></MenuItems>
            
			<MenuItems
				address="user-profile"
				label="My Profile"
                icon={FaUserEdit}
			></MenuItems>

		</>
	);
};

export default UserMenu;
