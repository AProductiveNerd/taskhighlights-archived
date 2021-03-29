const cool = require("tailwindcss/colors");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		rotate: {
			360: "360deg",
			"-360": "-360deg",
		},
		extend: {
			colors: {
				theme: {
					primary: "#e94560",
					secondary: "#0f3460",
					"secondary-two": "#2e5079",
					background: "#1a1a2e",
					third: "#16213e",
					fuchsia: cool.fuchsia,
					text: {
						"gray-base": "#616161",
					},
				},
				maybe: {
					primary: "#e84545",
					secondary: "#903749",
					background: "#53354a",
					third: "#2b2e4a",
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
