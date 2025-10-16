namespace $.$$ {
	$mol_style_define($bog_pay_app, {
		flex: {
			grow: 1,
		},
		display: 'flex',
		flexDirection: 'column',

		// Стили для кнопки "Главная"
		Home_button: {
			background: {
				color: 'orange',
			},
			color: 'white',
			padding: '12px 20px',
			border: {
				radius: '8px',
			},
			fontWeight: 'bold',
			':hover': {
				background: {
					color: 'darkorange',
				},
			},
		},

		// Стили для кнопки "Игры"
		Games_button: {
			background: {
				color: 'blue',
			},
			color: 'white',
			padding: '12px 20px',
			border: {
				radius: '8px',
			},
			fontWeight: 'bold',
			':hover': {
				background: {
					color: 'darkblue',
				},
			},
		},

		// Стили для кнопки "Личный кабинет"
		Account_button: {
			background: {
				color: 'green',
			},
			color: 'white',
			padding: '12px 20px',
			border: {
				radius: '8px',
			},
			fontWeight: 'bold',
			':hover': {
				background: {
					color: 'darkgreen',
				},
			},
		},

		Nav_buttons: {
			gap: '10px',
			padding: '10px',
		},
	})
}
