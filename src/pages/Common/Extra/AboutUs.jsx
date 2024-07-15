const AboutUs = () => {
	const teamMembers = [
		{
			name: "Hosan Ul Islam",
			role: "CEO",
			image: "https://i.ibb.co/wwb7bZH/Hosan.jpg",
			bio: "John is the visionary behind our company. With over 20 years of experience in the industry, he leads our team with a focus on innovation and excellence.",
		},
		// {
		// 	name: "Jane Smith",
		// 	role: "CTO",
		// 	image: "https://via.placeholder.com/150",
		// 	bio: "Jane is our technology guru. She is responsible for overseeing all technical aspects and drives our tech strategy forward.",
		// },
		// Add more team members as needed
	];
	return (
		<div className="bg-gray-100 min-h-screen">
			{/* Header */}
			<header className="bg-blue-700 text-white py-8">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold">About Us</h1>
					<p className="mt-2 text-lg">
						Learn more about our mission and the people behind our success.
					</p>
				</div>
			</header>

			{/* Mission Statement */}
			<section className="container mx-auto px-4 py-12">
				<h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
				<p className="text-gray-700 leading-loose">
					Our mission is to deliver exceptional services and solutions that
					exceed our clients expectations. We are dedicated to innovation,
					quality, and customer satisfaction. Our team works tirelessly to stay
					ahead of the curve and bring you the best in the industry.
				</p>
			</section>

			{/* Team Members */}
			<section className="bg-white py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{teamMembers.map((member, index) => (
							<div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
								<img
									src={member.image}
									alt={member.name}
									className="rounded-full w-32 h-32 mx-auto mb-4"
								/>
								<h3 className="text-xl font-semibold text-center">
									{member.name}
								</h3>
								<p className="text-blue-700 text-center">{member.role}</p>
								<p className="text-gray-700 mt-4">{member.bio}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;
