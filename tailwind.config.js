// tailwind.config.js

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			width: {
				super_larg: '78%',
				registeration: '60%',
				share: '50rem',
			},
			height: {
				super_larg_height: '80%',
			},
			backgroundColor: {
				share_color: '#F2BFB3',
			},
			backgroundImage: {
				share_card: 'url("/src/assets/share_card.jpg")',
				signUp: 'url("/src/assets/signUp.jpg")',
				login: 'url("/src/assets/login.jpg")',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
