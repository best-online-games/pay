namespace $.$$ {
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
					':nth-of-type(4)': {
						display: 'none',
					},
				},
			},
		},
	})
}
