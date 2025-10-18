namespace $.$$ {
	$mol_style_define($bog_pay_app_account, {
		Attach_images: {
			width: '6rem',
			height: '6rem',
			background: { color: $mol_theme.card },
			borderRadius: $mol_gap.round,
			padding: 0,
			alignItems: 'center',
			justifyContent: 'center',
			overflow: 'hidden',
			Icon: {
				width: '50%',
				height: '50%',
			},
		},
	})

	$mol_style_define($bog_pay_app, {
		Deck: {
			Switch: {
				justifyContent: 'space-between',
				Option: {
					font: {
						size: 'large',
						weight: 'bold',
					},
					':nth-of-type(1)': {
						color: '#667eea',
						':hover': {
							background: { color: '#667eea00' },
						},
					},
					':nth-of-type(2)': {},
					':nth-of-type(3)': {
						backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						color: 'white',
						borderRadius: '8px',
						padding: { top: '12px', right: '24px', bottom: '12px', left: '24px' },
					},
				},
			},
		},
	})
}
