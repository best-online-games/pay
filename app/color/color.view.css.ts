namespace $.$$ {
	const { rem, px } = $mol_style_unit

	$mol_style_define($bog_pay_app_color, {
		display: 'flex',
		flex: {
			direction: 'row',
			wrap: 'nowrap',
		},
		gap: $mol_gap.text,
		alignItems: 'center',

		Input: {
			flex: {
				grow: 1,
			},
		},

		Picker_wrapper: {
			flex: {
				shrink: 0,
			},
		},

		Picker: {
			width: px(40),
			height: px(40),
			border: {
				width: 0,
			},
			borderRadius: px(4),
			cursor: 'pointer',
			padding: 0,
		},
	})
}
