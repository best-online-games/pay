namespace $.$$ {
	export class $bog_pay_app_color extends $.$bog_pay_app_color {
		// Convert any color format to hex for native picker
		@$mol_mem
		hex_value(): string {
			const val = this.value()
			if (!val) return '#3b82f6'

			// If already hex
			if (val.startsWith('#')) return val

			// Try to convert from oklch/rgb/hsl
			return this.color_to_hex(val) || '#3b82f6'
		}

		// Convert color to hex using canvas
		color_to_hex(color: string): string | null {
			try {
				const ctx = document.createElement('canvas').getContext('2d')
				if (!ctx) return null

				ctx.fillStyle = color
				return ctx.fillStyle
			} catch (e) {
				return null
			}
		}

		// Convert hex to oklch (approximate)
		hex_to_oklch(hex: string): string {
			// Remove # if present
			hex = hex.replace('#', '')

			// Parse RGB
			const r = parseInt(hex.slice(0, 2), 16) / 255
			const g = parseInt(hex.slice(2, 4), 16) / 255
			const b = parseInt(hex.slice(4, 6), 16) / 255

			// Simple approximation: convert to lightness and chroma
			const max = Math.max(r, g, b)
			const min = Math.min(r, g, b)
			const l = (max + min) / 2

			let h = 0
			let c = 0

			if (max !== min) {
				c = max - min

				if (max === r) {
					h = ((g - b) / c + (g < b ? 6 : 0)) * 60
				} else if (max === g) {
					h = ((b - r) / c + 2) * 60
				} else {
					h = ((r - g) / c + 4) * 60
				}
			}

			// Convert to oklch format (approximation)
			const lightness = Math.round(l * 100)
			const chroma = (c * 0.2).toFixed(2)
			const hue = Math.round(h)

			return `oklch(${lightness}% ${chroma} ${hue}deg)`
		}

		// Handle picker input
		picker_input() {
			const input = this.Picker().dom_node() as HTMLInputElement
			const hex = input.value

			// Try to keep the current format
			const current = this.value()

			if (current.startsWith('oklch')) {
				// Convert hex to oklch
				this.value(this.hex_to_oklch(hex))
			} else if (current.startsWith('rgb')) {
				// Convert hex to rgb
				const r = parseInt(hex.slice(1, 3), 16)
				const g = parseInt(hex.slice(3, 5), 16)
				const b = parseInt(hex.slice(5, 7), 16)
				this.value(`rgb(${r}, ${g}, ${b})`)
			} else {
				// Use hex
				this.value(hex)
			}
		}

		@$mol_mem
		Picker(): $mol_view {
			const picker = new this.$.$mol_view()
			picker.dom_name = () => 'input'

			picker.attr = () => ({
				type: 'color',
				value: this.hex_value(),
			})

			picker.event = () => ({
				input: (e: Event) => {
					const target = e.target as HTMLInputElement
					const hex = target.value

					// Try to preserve format
					const current = this.value()

					if (current.startsWith('oklch')) {
						this.value(this.hex_to_oklch(hex))
					} else if (current.startsWith('rgb')) {
						const r = parseInt(hex.slice(1, 3), 16)
						const g = parseInt(hex.slice(3, 5), 16)
						const b = parseInt(hex.slice(5, 7), 16)
						this.value(`rgb(${r}, ${g}, ${b})`)
					} else {
						this.value(hex)
					}
				},
			})

			return picker
		}
	}
}
