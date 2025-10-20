namespace $.$$ {
	const { rem } = $mol_style_unit

	$mol_style_define($bog_pay_app_games, {
		// Контейнер страницы
		Body_content: {
			display: 'block',
			padding: $mol_gap.block,
			maxWidth: rem(90),
			margin: [0, 'auto'],
		},

		// Хиро-заголовок: левая чёрная часть
		Games_section: {
			display: 'inline',
			margin: { right: $mol_gap.text },
			Title: {
				display: 'inline',
				font: {
					size: rem(3.5),
					weight: 800,
				},
				color: $mol_theme.text,
			},
		},

		// Хиро-заголовок: правая синяя часть
		Bog_ping: {
			display: 'inline',
			Title: {
				display: 'inline',
				font: {
					size: rem(3.5),
					weight: 800,
				},
				color: $mol_theme.focus,
			},
		},

		// Грид карточек игр
		Games_grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat( auto-fit, minmax(20rem, 1fr) )',
			gap: $mol_gap.block,
			margin: [$mol_gap.block, 0],
			align: { items: 'stretch' },
		},

		// Карточки (база)
		Game1: {
			background: { color: $mol_theme.card },
			padding: $mol_gap.block,
			boxShadow: `0 0 0 1px var(--mol_theme_line)`,
			transition: 'transform .15s ease, box-shadow .15s ease',
			':hover': {
				transform: 'translateY(-2px)',
				boxShadow: `0 .5rem 1.5rem rgba(0,0,0,.08), 0 0 0 1px var(--mol_theme_line)`,
			},
		},
		Game2: {
			background: { color: $mol_theme.card },
			padding: $mol_gap.block,
			boxShadow: `0 0 0 1px var(--mol_theme_line)`,
			transition: 'transform .15s ease, box-shadow .15s ease',
			':hover': {
				transform: 'translateY(-2px)',
				boxShadow: `0 .5rem 1.5rem rgba(0,0,0,.08), 0 0 0 1px var(--mol_theme_line)`,
			},
		},
		Game3: {
			background: { color: $mol_theme.card },
			boxShadow: `0 0 0 1px var(--mol_theme_line)`,
			transition: 'transform .15s ease, box-shadow .15s ease',
			':hover': {
				transform: 'translateY(-2px)',
				boxShadow: `0 .5rem 1.5rem rgba(0,0,0,.08), 0 0 0 1px var(--mol_theme_line)`,
			},
		},

		// Иконки
		Game1_icon: {
			fontSize: rem(2.5),
			margin: { bottom: $mol_gap.text },
		},
		Game2_icon: {
			fontSize: rem(2.5),
			margin: { bottom: $mol_gap.text },
		},
		Game3_icon: {
			fontSize: rem(2.5),
			margin: { bottom: $mol_gap.text },
		},

		// Заголовки карточек
		Game1_title: {
			font: { weight: 700, size: rem(1.25) },
			color: $mol_theme.text,
			margin: { bottom: $mol_gap.text },
		},
		Game2_title: {
			font: { weight: 700, size: rem(1.25) },
			color: $mol_theme.text,
			margin: { bottom: $mol_gap.text },
		},
		Game3_title: {
			font: { weight: 700, size: rem(1.25) },
			color: $mol_theme.text,
			margin: { bottom: $mol_gap.text },
		},

		// Текст карточек
		Game1_text: {
			color: $mol_theme.text,
			opacity: 0.8,
		},
		Game2_text: {
			color: $mol_theme.text,
			opacity: 0.8,
		},
		Game3_text: {
			color: $mol_theme.text,
			opacity: 0.8,
		},
	})
}
