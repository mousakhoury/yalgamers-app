/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			'primary-background': {
				DEFAULT: '#280E30',
				10: '#3D2434'
			},
			'secondary-background': '#792341',
			accent: '#140718',
			'accent-yellow': {
				DEFAULT: '#FDEB56',
				10: 'rgba(253, 235, 86,0.1)'
			},
			dark: '#2A0D32',
			'accent-2': '#200B26',
			'accent-red': '#F71756',
			'explore-game': 'rgba(253, 235, 86, 0.10)',
			green: '#1FD031',
			positive: '#1FD031',
			transparentbg: 'rgba(255, 255, 255, 0.10)',
			blur: 'rgba(20, 7, 24, 0.70)',
			white: {
				DEFAULT: '#FFFFFF',
				10: '#3D2644',
				30: '#68566E',
				70: '#BEB6C0',
				40: '#7E6E83',
				50: '#948798',
				60: '#A99FAC',
				80: '#D4CFD6',
				90: '#E9E6EA',
				20: '#533E59'
			},
			skip: 'rgba(255, 255, 255, 0.05)',
			inputbg: '#2A1430'
		},
		extend: {
			boxShadow: {
				primary: '0px 4px 12px 0px rgba(251, 134, 86, 0.25);'
			},
			fontFamily: {
				'Gilroy-Bold': 'Gilroy-Bold,fallback,All-Gender-Bold',
				'Gilroy-Medium': 'Gilroy-Medium,fallback,All-Gender-Regular',
				Gilroy: 'Gilroy-Regular,fallback,All-Gender-Light',
				'Gilroy-SemiBold': 'Gilroy-SemiBold,fallback,All-Gender-Bold'
			},
			backgroundImage: {
				'gradient-black':
					'linear-gradient(90deg, rgba(20, 7, 24, 0.90) 38.54%, rgba(20, 7, 24, 0.30) 100%)',
				'gradient-hr':
					'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.10) 50%, rgba(255, 255, 255, 0.00) 100%);',
				'gradient-primary':
					'linear-gradient(180deg, rgba(15, 12, 0, 0.00) 0%, rgba(34, 12, 40, 0.00) 0.01%, rgba(34, 12, 40, 0.36) 17.19%, rgba(34, 12, 40, 0.81) 52.08%);',
				'gradient-135': 'linear-gradient(135deg, #F71756 0%, #FDEB56 100%)',
				'gradient-90-variant':
					'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.10) 46.88%, rgba(255, 255, 255, 0.00) 100%);',
				'gradient-90':
					'linear-gradient(90deg, rgba(20, 7, 24, 0.95) 28.13%, rgba(20, 7, 24, 0.00) 100%)',
				'gradient-270':
					'linear-gradient(270deg, rgba(20, 7, 24, 0.95) 28.13%, rgba(20, 7, 24, 0.00) 100%)',
				'gradient-180-variant':
					'linear-gradient(180deg, rgba(15, 12, 0, 0.00) 0%, rgba(20, 7, 24, 0.00) 0.01%, rgba(20, 7, 24, 0.35) 11.97%, rgba(20, 7, 24, 0.90) 33.04%);',
				'gradient-180':
					'linear-gradient(180deg, rgba(15, 12, 0, 0.00) 0%, rgba(20, 7, 24, 0.00) 0.01%, rgba(20, 7, 24, 0.35) 32.29%, rgba(20, 7, 24, 0.90) 70.31%)'
			},
			animation: {
				bottom: 'wiggleUp 0.1s forwards 1',
				top: 'wiggleDown 0.5s forwards 1',
				searchFor: 'searchanimForward 0.5s forwards 1',
				searchBac: 'searchanimBack 0.5s forwards 1',
				'bottom-margin': 'marginBottom 0.2s forwards 1'
			},
			keyframes: {
				searchanimForward: {
					'0%': { width: '330px' },
					'100%': { width: '580px' }
				},
				searchanimBack: {
					'0%': { width: '580px' },
					'100%': { width: '330px' }
				},
				marginBottom: {
					'0%': { 'margin-bottom': '0px' },
					'100%': { 'margin-bottom': '16px' }
				},
				wiggleUp: {
					'0%': { 'padding-bottom': '0px' },
					'100%': { 'padding-bottom': '16px' }
				},
				wiggleDown: {
					'0%': { 'padding-top': '0px' },
					'100%': { 'padding-top': '8px' }
				}
			},
			screens: {
				'max-lg': { max: '1024px' } // Custom max-width breakpoint
			}
		}
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('peer-valid-not-focused', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `[class="${`peer-valid-not-focused${separator}${className}`}"]:valid:not(:focus)`;
				});
			});
		},
		require('@tailwindcss/typography')
	]
};
