const Promotions = () => {
	const promotions = [
		{
			id: "promo1",
			title: "Summer Health Checkup Discount",
			description:
				"Get 25% off on all health checkup packages this summer. Stay healthy and enjoy your summer vacations.",
			image: "https://i.ibb.co/7WrLNWZ/Summer-Special-Web-1499-1.webp",
			validUntil: "2024-08-31",
			couponCode: "SUMMER25",
			discountRate: 25,
		},
		{
			id: "promo2",
			title: "Refer a Friend",
			description:
				"Refer a friend and get 10% off on your next test. Your friend also gets a 10% discount on their first test.",
			image: "https://i.ibb.co/zHVYsbX/mobile-banner-2.jpg",
			validUntil: "2024-12-31",
			couponCode: "REFER10",
			discountRate: 10,
		},
		{
			id: "promo3",
			title: "Senior Citizen Health Package",
			description:
				"Comprehensive health checkup package for senior citizens at a special price of $100. Includes all essential tests.",
			image: "https://i.ibb.co/CWCqS3N/441596711.jpg",
			validUntil: "2024-12-31",
			couponCode: "SENIOR100",
			discountRate: 20,
		},
		// {
		// 	id: "promo4",
		// 	title: "First-Time User Discount",
		// 	description:
		// 		"Welcome to DiagnoEase! Get 15% off on your first test. Use code FIRST15 at checkout.",
		// 	image: "https://example.com/images/promo_first.jpg",
		// 	validUntil: "2024-12-31",
		// 	couponCode: "FIRST15",
		// 	discountRate: 15,
		// },
		// {
		// 	id: "promo5",
		// 	title: "Breast Cancer Awareness Month Special",
		// 	description:
		// 		"In October, get a free mammogram with any health checkup package. Early detection saves lives.",
		// 	image: "https://example.com/images/promo_breastcancer.jpg",
		// 	validUntil: "2024-10-31",
		// 	couponCode: "BREASTAWARE",
		// 	discountRate: 0,
		// },
	];
	return (
		<div>
			<h2 className="text-4xl text-center my-10 font-extrabold dark:text-white">
				Promotions Offer
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{promotions.map((promo) => (
					<div key={promo.id} className="p-4 border rounded shadow">
						<img
							src={promo.image}
							alt={promo.title}
							className="w-full h-48 object-cover rounded"
						/>
						<h3 className="text-xl font-semibold mt-2">{promo.title}</h3>
						<p className="text-base">{promo.description}</p>
						<p>
							Valid Until: {new Date(promo.validUntil).toLocaleDateString()}
						</p>
						<p className="font-medium" >Coupon Code: {promo.couponCode}</p>
						<p className="font-medium">Discount Rate: {promo.discountRate}%</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Promotions;
