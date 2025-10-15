namespace $.$$ {
	const { rem, per } = $mol_style_unit

	$mol_style_define($bog_pay_app_page_hero, {
		Body: {
			padding: 0,
			maxWidth: '100%',
			overflow: 'hidden',
		},

		Hero_section: {
			background: {
				image: [['linear-gradient(135deg, #f5f2ff 0%, #fff 100%)']],
			},
			padding: {
				top: rem(3),
				bottom: rem(3),
				left: rem(1.5),
				right: rem(1.5),
			},
			textAlign: 'center',
			width: '100%',
			boxSizing: 'border-box',
		},

		Hero_content: {
			maxWidth: rem(56.25),
			width: '100%',
			margin: {
				top: 0,
				bottom: 0,
				left: 'auto',
				right: 'auto',
			},
			padding: {
				top: 0,
				bottom: 0,
				left: rem(1),
				right: rem(1),
			},
			boxSizing: 'border-box',
		},

		Hero_title: {
			fontSize: `clamp(${rem(1.75)}, 5vw, ${rem(3)})`,
			marginBottom: rem(1.5),
			fontWeight: '700',
			alignItems: 'center',
			justifyContent: 'center',
			wordWrap: 'break-word',
		},

		Hero_description: {
			fontSize: `clamp(${rem(1)}, 3vw, ${rem(1.25)})`,
			color: '#555',
			marginBottom: rem(2),
			lineHeight: '1.6',
			wordWrap: 'break-word',
		},

		Download_button: {
			fontSize: rem(1.125),
			padding: {
				top: rem(1),
				bottom: rem(1),
				left: rem(2.5),
				right: rem(2.5),
			},
			marginBottom: rem(1),
		},

		Guarantee_text: {
			color: '#6d4aff',
			fontWeight: '600',
			marginTop: rem(1),
			marginBottom: rem(2),
		},

		Hero_image: {
			maxWidth: '100%',
			width: '100%',
			margin: {
				top: rem(2.5),
				left: 'auto',
				right: 'auto',
				bottom: 0,
			},
			background: {
				image: [['linear-gradient(135deg, #6d4aff, #9d7aff)']],
			},
			height: `clamp(${rem(15)}, 40vw, ${rem(25)})`,
			borderRadius: rem(1),
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			fontSize: `clamp(${rem(1)}, 3vw, ${rem(1.5)})`,
			fontWeight: '600',
			boxSizing: 'border-box',
		},

		Trust_badges: {
			display: 'flex',
			justifyContent: 'center',
			gap: rem(1),
			marginTop: rem(2.5),
			flexWrap: 'wrap',
			width: '100%',
			boxSizing: 'border-box',
		},

		Badge1: {
			padding: {
				top: rem(0.75),
				bottom: rem(0.75),
				left: rem(1.5),
				right: rem(1.5),
			},
			background: {
				color: 'white',
			},
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: '600',
		},

		Badge2: {
			padding: {
				top: rem(0.75),
				bottom: rem(0.75),
				left: rem(1.5),
				right: rem(1.5),
			},
			background: {
				color: 'white',
			},
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: '600',
		},

		Badge3: {
			padding: {
				top: rem(0.75),
				bottom: rem(0.75),
				left: rem(1.5),
				right: rem(1.5),
			},
			background: {
				color: 'white',
			},
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: '600',
		},

		Stats_section: {
			padding: {
				top: rem(3),
				bottom: rem(3),
				left: rem(1.5),
				right: rem(1.5),
			},
			maxWidth: rem(75),
			width: '100%',
			margin: {
				top: 0,
				bottom: 0,
				left: 'auto',
				right: 'auto',
			},
			boxSizing: 'border-box',
		},

		Stats_title: {
			fontSize: rem(2.25),
			marginBottom: rem(1.5),
			textAlign: 'center',
			fontWeight: '700',
			justifyContent: 'center',
		},

		Stats_subtitle: {
			textAlign: 'center',
			color: '#555',
			fontSize: rem(1.125),
			maxWidth: rem(43.75),
			margin: {
				top: rem(1.25),
				bottom: rem(1.25),
				left: 'auto',
				right: 'auto',
			},
		},

		Stats_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
			gap: rem(2),
			textAlign: 'center',
			marginTop: rem(3),
			width: '100%',
		},

		Stat1: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},

		Stat2: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},

		Stat3: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},

		Stat1_value: {
			fontSize: rem(3),
			color: '#6d4aff',
			marginBottom: rem(0.5),
			fontWeight: '700',
			justifyContent: 'center',
		},

		Stat2_value: {
			fontSize: rem(3),
			color: '#6d4aff',
			marginBottom: rem(0.5),
			fontWeight: '700',
			justifyContent: 'center',
		},

		Stat3_value: {
			fontSize: rem(3),
			color: '#6d4aff',
			marginBottom: rem(0.5),
			fontWeight: '700',
			justifyContent: 'center',
		},

		Stat1_label: {
			color: '#555',
		},

		Stat2_label: {
			color: '#555',
		},

		Stat3_label: {
			color: '#555',
		},
	})
}
