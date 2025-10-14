namespace $.$$ {
	const { rem, px } = $mol_style_unit

	$mol_style_define($bog_pay_app_demo, {
		Demo_content: {
			gap: $mol_gap.block,
			padding: $mol_gap.block,
		},

		Welcome_section: {
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			borderRadius: px(8),
		},

		Welcome_title: {
			fontSize: rem(1.5),
			fontWeight: 'bold',
			margin: {
				bottom: $mol_gap.block,
			},
		},

		Cards_section: {
			gap: $mol_gap.block,
		},

		Cards_title: {
			fontSize: rem(1.25),
			fontWeight: 'bold',
			padding: $mol_gap.block,
		},

		Cards_row: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
		},

		Card1: {
			flex: {
				basis: rem(15),
				grow: 1,
			},
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			borderRadius: px(8),
			border: {
				width: px(1),
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		Card2: {
			flex: {
				basis: rem(15),
				grow: 1,
			},
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			borderRadius: px(8),
			border: {
				width: px(1),
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		Card3: {
			flex: {
				basis: rem(15),
				grow: 1,
			},
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			borderRadius: px(8),
			border: {
				width: px(1),
				style: 'solid',
				color: $mol_theme.line,
			},
		},

		Card1_title: {
			fontSize: rem(1.1),
			fontWeight: '600',
			margin: {
				bottom: $mol_gap.text,
			},
		},

		Card2_title: {
			fontSize: rem(1.1),
			fontWeight: '600',
			margin: {
				bottom: $mol_gap.text,
			},
		},

		Card3_title: {
			fontSize: rem(1.1),
			fontWeight: '600',
			margin: {
				bottom: $mol_gap.text,
			},
		},

		Forms_section: {
			gap: $mol_gap.block,
		},

		Forms_title: {
			fontSize: rem(1.25),
			fontWeight: 'bold',
			padding: $mol_gap.block,
		},

		Form_demo: {
			gap: $mol_gap.block,
			padding: $mol_gap.block,
			background: {
				color: $mol_theme.card,
			},
			borderRadius: px(8),
		},

		Options_row: {
			gap: $mol_gap.block,
			flex: {
				wrap: 'wrap',
			},
		},

		Buttons_row: {
			gap: $mol_gap.block,
		},

		Table_section: {
			gap: $mol_gap.block,
		},

		Table_title: {
			fontSize: rem(1.25),
			fontWeight: 'bold',
			padding: $mol_gap.block,
		},

		Table_demo: {
			gap: px(1),
			background: {
				color: $mol_theme.line,
			},
			border: {
				width: px(1),
				style: 'solid',
				color: $mol_theme.line,
			},
			borderRadius: px(8),
		},

		Table_header: {
			background: {
				color: $mol_theme.card,
			},
			fontWeight: 'bold',
			padding: $mol_gap.block,
			gap: px(1),
		},

		Table_row1: {
			background: {
				color: $mol_theme.back,
			},
			padding: $mol_gap.block,
			gap: px(1),
		},

		Table_row2: {
			background: {
				color: $mol_theme.back,
			},
			padding: $mol_gap.block,
			gap: px(1),
		},

		Table_row3: {
			background: {
				color: $mol_theme.back,
			},
			padding: $mol_gap.block,
			gap: px(1),
		},

		Header1: {
			flex: {
				grow: 1,
				basis: 0,
			},
		},

		Header2: {
			flex: {
				grow: 1,
				basis: 0,
			},
		},

		Header3: {
			flex: {
				grow: 1,
				basis: 0,
			},
		},
	})
}
