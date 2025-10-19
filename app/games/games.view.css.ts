namespace $.$$ {
	const { rem } = $mol_style_unit

	$mol_style_define($bog_pay_app_games, {
		some: {
			color: 'red',
		},
		Games_section: {
			display: 'flex',
			flexDirection: 'column',
			gridGap: '10px',
			padding: '10px',
			Title: {
				fontSize: rem(2),
			},
		},

		Bog_ping: {
			padding: '10px',
		},

		Games_grid: {
			display: 'flex',
			flexDirection: 'column',
			padding: '10px',
		},

		Body_content: {
			contain: 'none',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Game1_text: {
			color: 'red',
			fontSize: '20px',
			margin: '10px',
		},
		Game2_text: {
			color: 'blue',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Body: {
			contain: 'none',
		},
	})
}
