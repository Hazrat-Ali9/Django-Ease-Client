import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
	const { user, logOut } = useAuth();
	const [isActive, setActive] = useState(false);
	const sidebarRef = useRef(null);

	const handleToggle = () => {
		setActive(!isActive);
	};

	const handleClickOutside = (event) => {
		if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
			setActive(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLinkClick = () => {
		setActive(false);
	};

	return (
		<div>
			<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-4">
					<Link
						to={"/"}
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<p className="self-center text-lg md:text-2xl font-bold  whitespace-nowrap dark:text-white">
							Diagno<span className="text-blue-700">Ease</span>
						</p>
					</Link>
					<div className="flex md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
						{user ? (
							<>
								<Link
									to={"dashboard/user-profile"}
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-4 px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={handleLinkClick}
								>
									Dashboard
								</Link>
								<button
									onClick={() => {
										logOut();
										handleLinkClick();
									}}
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to={"/login"}
									type="button"
									className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									onClick={handleLinkClick}
								>
									Login
								</Link>
							</>
						)}
						<button
							onClick={handleToggle}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						ref={sidebarRef}
						className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
							isActive ? "block" : "hidden"
						}`}
						id="navbar-sticky"
					>
						<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									to={"/"}
									className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
									aria-current="page"
									onClick={handleLinkClick}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to={"/tests"}
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									onClick={handleLinkClick}
								>
									All Tests
								</Link>
							</li>
							<li>
								<Link
									to={"/bmi-calculator"}
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									BMI Calculator
								</Link>
							</li>
							<li>
								<Link
									to={"/about-us"}
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to={"/contact-us"}
									className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
