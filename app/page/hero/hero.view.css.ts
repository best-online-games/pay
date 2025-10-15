namespace $.$$ {
	const { rem, per } = $mol_style_unit
	
	$mol_style_define( $bog_pay_app_page_hero, {
		Body: {
			padding: 0,
		},
		
		Hero_section: {
			background: 'linear-gradient(135deg, #f5f2ff 0%, #fff 100%)',
			padding: rem(5),
			textAlign: 'center',
		},
		
		Hero_content: {
			maxWidth: rem(56.25),
			margin: '0 auto',
		},
		
		Hero_title: {
			fontSize: rem(3),
			marginBottom: rem(1.5),
			fontWeight: 700,
			alignItems: 'center',
			justifyContent: 'center',
		},
		
		Hero_description: {
			fontSize: rem(1.25),
			color: '#555',
			marginBottom: rem(2),
			lineHeight: 1.6,
		},
		
		Download_button: {
			fontSize: rem(1.125),
			padding: `${rem(1)} ${rem(2.5)}`,
			marginBottom: rem(1),
		},
		
		Guarantee_text: {
			color: '#6d4aff',
			fontWeight: 600,
			marginTop: rem(1),
			marginBottom: rem(2),
		},
		
		Hero_image: {
			maxWidth: rem(37.5),
			margin: `${rem(2.5)} auto 0`,
			background: 'linear-gradient(135deg, #6d4aff, #9d7aff)',
			height: rem(25),
			borderRadius: rem(1),
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			fontSize: rem(1.5),
			fontWeight: 600,
		},
		
		Trust_badges: {
			display: 'flex',
			justifyContent: 'center',
			gap: rem(2.5),
			marginTop: rem(2.5),
			flexWrap: 'wrap',
		},
		
		Badge1: {
			padding: `${rem(0.75)} ${rem(1.5)}`,
			background: 'white',
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: 600,
		},
		
		Badge2: {
			padding: `${rem(0.75)} ${rem(1.5)}`,
			background: 'white',
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: 600,
		},
		
		Badge3: {
			padding: `${rem(0.75)} ${rem(1.5)}`,
			background: 'white',
			borderRadius: rem(0.5),
			boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
			fontWeight: 600,
		},
		
		Stats_section: {
			padding: rem(5),
			maxWidth: rem(75),
			margin: '0 auto',
		},
		
		Stats_title: {
			fontSize: rem(2.25),
			marginBottom: rem(1.5),
			textAlign: 'center',
			fontWeight: 700,
			justifyContent: 'center',
		},
		
		Stats_subtitle: {
			textAlign: 'center',
			color: '#555',
			fontSize: rem(1.125),
			maxWidth: rem(43.75),
			margin: `${rem(1.25)} auto`,
		},
		
		Stats_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gap: rem(2.5),
			textAlign: 'center',
			marginTop: rem(3.75),
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
			fontWeight: 700,
			justifyContent: 'center',
		},
		
		Stat2_value: {
			fontSize: rem(3),
			color: '#6d4aff',
			marginBottom: rem(0.5),
			fontWeight: 700,
			justifyContent: 'center',
		},
		
		Stat3_value: {
			fontSize: rem(3),
			color: '#6d4aff',
			marginBottom: rem(0.5),
			fontWeight: 700,
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
	} )
}
