/** @type {import('tailwindcss').Config} */
// const flowbite = require("flowbite-react/tailwind");
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
		"./node_modules/flowbite/**/*.js",
		// flowbite.content(),
	],
	theme: {
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
};
