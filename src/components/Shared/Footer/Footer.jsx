const Footer = () => {
	return (
		<div>
			<footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-4">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<p className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
							{/* <img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8"
								alt="Flowbite Logo"
							/> */}
							<p className="self-center text-lg md:text-2xl font-bold  whitespace-nowrap dark:text-white">
								Diagno<span className="text-blue-700">Ease</span>
							</p>
						</p>
						<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
							<li>
								<a href="#" className="hover:underline me-4 md:me-6">
									About
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline me-4 md:me-6">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline me-4 md:me-6">
									Licensing
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2024 <span className="hover:underline">DiagnoEase™</span>. All
						Rights Reserved.
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
