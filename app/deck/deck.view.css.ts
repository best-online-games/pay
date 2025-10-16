namespace $.$$ {
	$mol_style_define($bog_pay_app_deck, {
		Switch: {
			gap: '10px',
			padding: '10px',
			// Стилизуем кнопки по порядку
			Option: {
				// Первая кнопка - Главная (оранжевая)
				':nth-child(1)': {
					background: 'orange',
					color: 'white',
					padding: '12px 20px',
					borderRadius: '8px',
					fontWeight: 'bold',
					'@': {
						mol_check_checked: {
							true: {
								background: 'darkorange',
								boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
							},
						},
					},
				},
				// Вторая кнопка - Игры (синяя)
				':nth-child(2)': {
					background: 'blue',
					color: 'white',
					padding: '12px 20px',
					borderRadius: '8px',
					fontWeight: 'bold',
					'@': {
						mol_check_checked: {
							true: {
								background: 'darkblue',
								boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
							},
						},
					},
				},
				// Третья кнопка - Личный кабинет (зелёная)
				':nth-child(3)': {
					background: 'green',
					color: 'white',
					padding: '12px 20px',
					borderRadius: '8px',
					fontWeight: 'bold',
					'@': {
						mol_check_checked: {
							true: {
								background: 'darkgreen',
								boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
							},
						},
					},
				},
			},
		},
	})
}
