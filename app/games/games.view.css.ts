namespace $.$$ {
	$mol_style_define($bog_pay_app_games, {
		Games_section: {
			position: 'absolute',
			top: '350%',
			left: '40%',
			transform: 'translate(-50%, -50%)',
			display: 'flex',
			flexDirection: 'column',
			gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			gridGap: '10px',
			padding: '10px',
		},

		Bog_ping: {
			left: '60%',
			position: 'absolute',
			top: '350%',
			transform: 'translate(-50%, -50%)',
			gridGap: '10px',
			padding: '10px',
		},

		Games_grid: {
			position: 'absolute',
			top: '2000%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			display: 'flex',
			flexDirection: 'column',
			gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			gridGap: '10px',
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
