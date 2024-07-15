import { useForm } from "react-hook-form";
const ContactUs = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);
	return (
		<div>
			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col lg:flex-row justify-between">
					<div className="lg:w-1/2 bg-white p-8 shadow-lg rounded-lg">
						<h2 className="text-2xl font-bold mb-6 text-blue-700">
							Get In Touch
						</h2>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div>
								<label className="block text-gray-700">Name:</label>
								<input
									type="text"
									{...register("name", { required: true })}
									className="block w-full p-2 border border-gray-300 rounded mt-1"
									placeholder="Your Name"
								/>
								{errors.name && (
									<span className="text-red-500">This field is required</span>
								)}
							</div>
							<div>
								<label className="block text-gray-700">Email:</label>
								<input
									type="email"
									{...register("email", { required: true })}
									className="block w-full p-2 border border-gray-300 rounded mt-1"
									placeholder="abc@xyz.com"
								/>
								{errors.email && (
									<span className="text-red-500">This field is required</span>
								)}
							</div>
							<div>
								<label className="block text-gray-700">Contact Number:</label>
								<input
									type="text"
									{...register("contact", { required: true })}
									className="block w-full p-2 border border-gray-300 rounded mt-1"
									placeholder="Phone"
								/>
								{errors.contact && (
									<span className="text-red-500">This field is required</span>
								)}
							</div>
							<div>
								<label className="block text-gray-700">Message:</label>
								<textarea
									{...register("message", { required: true })}
									className="block w-full p-2 border border-gray-300 rounded mt-1"
									placeholder="Your Message"
									rows="4"
								></textarea>
								{errors.message && (
									<span className="text-red-500">This field is required</span>
								)}
							</div>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded hover:bg-blue-500"
							>
								Send Message
							</button>
						</form>
					</div>
					<div className="lg:w-1/2 mt-12 lg:mt-0 lg:ml-8">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236153.61522570817!2d91.81903704999999!3d22.35739545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChattogram!5e0!3m2!1sen!2sbd!4v1717896798324!5m2!1sen!2sbd"
							width="100%"
							height="100%"
							className="rounded-lg shadow-lg"
							allowFullScreen=""
							loading="lazy"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
};
{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236153.61522570817!2d91.81903704999999!3d22.35739545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChattogram!5e0!3m2!1sen!2sbd!4v1717896798324!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
export default ContactUs;
