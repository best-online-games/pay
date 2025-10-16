namespace $.$$ {
	$mol_style_define($bog_pay_app_games, {
		Why_grid: {
			display: 'flex',
			flexDirection: 'column',
			gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			gridGap: '10px',
			padding: '10px',
		},
		// кнопка описания для каких игр
		Games_title: {
			position: 'absolute',
			top: '10%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			color: 'black',
			fontSize: '40px',
			fontWeight: '700',
			margin: '10px',
			fontFamily: 'Arial, sans-serif',
		},

		Games_grid: {
			position: 'absolute',
			top: '150%',
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
