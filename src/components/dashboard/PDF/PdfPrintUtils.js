import jsPDF from "jspdf";

export const handleUserTestReportPdf = (test) => {
	console.log(test);
	const doc = new jsPDF();
	// Adding the text
	doc.setFontSize(25);
	doc.text("DiagnoEase", 20, 20);

	doc.setFontSize(12);
	doc.text("Accurate | Caring | Instant", 20, 27);

	doc.setFontSize(10);
	doc.text("1240, Zakir Hossain Road, East Nasirabad", 20, 35);
	doc.text("Chittagong, Chittagong.", 20, 41);

	// Adding contact information
	doc.setFontSize(10);
	doc.text(" +8801707856409", 150, 20);
	doc.text(" hosan@DiagnoEase.com", 150, 25);

	// Break Line
	doc.setLineWidth(1);
	doc.line(5, 45, 205, 45);

	// User Test Info
	doc.setFontSize(15);
	doc.text(`${test.user.name}`, 20, 55);
	doc.setFontSize(12);
	doc.text(`Blood Group: ${test.user.bloodGroup}`, 20, 60);
	doc.text(`Address: ${test.user.upazila}, ${test.user.district}`, 20, 65);

	// Break Line
	doc.setLineWidth(1);
	doc.line(5, 70, 205, 70);

	// Test Report Heading
	doc.setFontSize(20);
	doc.text("Test Report", 110, 80, { align: "center" });
	doc.setLineWidth(0.5);
	doc.line(10, 85, 195, 85);

	// Test Report Data
	doc.setFontSize(15);
	doc.text(`${test.testData.name}`, 20, 95);
	doc.setFontSize(12);
	// doc.text(`${test.testData.description}`, 20, 100);
	doc.text(`Price: $ ${test.testData.price}`, 20, 100);
	doc.text(`Transaction ID: ${test.transactionId}`, 20, 105);
	doc.text(
		`Report delivery date: ${new Date(
			test.resultDeliveryDate
		).toLocaleDateString()}`,
		20,
		110
	);
	doc.text(`Report:`, 20, 115);
	doc.text(`${test.result}`, 25, 120);
	doc.save(`${test.user.name}'s Test Report on ${test.testData.name}`);

	// doc.autoPrint();
	// Open PDF in new window
	// 	const string = doc.output("bloburl");
	// 	const iframe = `<iframe width='100%' height='100%' src='${string}'></iframe>`;
	// 	const x = window.open();
	// 	x.document.open();
	// 	x.document.write(iframe);
	// 	x.document.close();
};

export const handleUserAppointmentsPdf = (data, user) => {
	const doc = new jsPDF();
	// Adding the text
	doc.setFontSize(25);
	doc.text("DiagnoEase", 20, 20);

	doc.setFontSize(12);
	doc.text("Accurate | Caring | Instant", 20, 27);

	doc.setFontSize(10);
	doc.text("1240, Zakir Hossain Road, East Nasirabad", 20, 35);
	doc.text("Chittagong, Chittagong.", 20, 41);

	// Adding contact information
	doc.setFontSize(10);
	doc.text(" +8801707856409", 150, 20);
	doc.text(" hosan@DiagnoEase.com", 150, 25);

	// Break Line
	doc.setLineWidth(1);
	doc.line(5, 45, 205, 45);

	// User Test Info
	doc.setFontSize(15);
	doc.text(`${user.name}`, 20, 55);
	doc.setFontSize(12);
	doc.text(`Blood Group: ${user.bloodGroup}`, 20, 60);
	doc.text(`Address: ${user.upazila}, ${user.district}`, 20, 65);

	// Break Line
	doc.setLineWidth(1);
	doc.line(5, 70, 205, 70);

	// Appointments Report Heading
	doc.setFontSize(20);
	doc.text("Appointments ", 110, 80, { align: "center" });
	doc.setLineWidth(0.5);
	doc.line(10, 85, 195, 85);

	//
	let y = 90;
	const yAxis = () => {
		y += 5;
		return y;
	};
	doc.setFontSize(12);
	data.map((app) => {
		doc.text(`${app.testData.name}`, 20, yAxis());
		doc.text(`Price: ${app.testData.price}`, 20, yAxis());
		doc.text(`Transaction ID: ${app.transactionId}`, 20, yAxis());
		doc.text(`Test Status: ${app.status}`, 20, yAxis());
		if (app.status === "delivered") {
			doc.text(
				`Delivery Date: ${new Date(
					app.resultDeliveryDate
				).toLocaleDateString()}`,
				20,
				yAxis()
			);
			doc.text(`Report: ${app.result}`, 20, yAxis());
			yAxis();
		} else {
			doc.text(
				`Appointment Date: ${new Date(app.testData.date).toLocaleDateString()}`,
				20,
				yAxis()
			);
		}
		doc.setLineWidth(0.5);
		doc.line(20, yAxis(), 185, y);
	});

	doc.save(`${user.name}'s Appointments Summary`);

// 	const string = doc.output("bloburl");
// 	const iframe = `<iframe width='100%' height='100%' src='${string}'></iframe>`;
// 	const x = window.open();
// 	x.document.open();
// 	x.document.write(iframe);
// 	x.document.close();
};
