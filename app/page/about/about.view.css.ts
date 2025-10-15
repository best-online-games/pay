namespace $.$$ {
	const { rem } = $mol_style_unit

	$mol_style_define($bog_pay_app_page_about, {
		Body: {
			padding: 0,
			maxWidth: '100%',
			overflow: 'hidden',
		},

		About_section: {
			padding: rem(3),
			maxWidth: rem(75),
			margin: '0 auto',
			textAlign: 'center',
			width: '100%',
			boxSizing: 'border-box',
		},

		About_title: {
			fontSize: rem(2.25),
			marginBottom: rem(1.5),
			fontWeight: '700',
			justifyContent: 'center',
		},

		About_text: {
			color: '#555',
			fontSize: rem(1.125),
			maxWidth: rem(50),
			margin: `${rem(1.25)} auto ${rem(3.75)}`,
			lineHeight: '1.8',
		},

		About_button: {
			fontSize: rem(1.125),
			padding: `${rem(1)} ${rem(2.5)}`,
		},
	})
}
