namespace $.$$ {

	// Single-avatar upload control sized like mol_attach tile (6rem x 6rem).
	// Subclasses $mol_button_open to reuse native file input behavior.
	export class $bog_pay_app_account_avatar extends $.$mol_button_open {

		@ $mol_mem
		profile() {
			// Current user profile in CRUS
			return this.$.$hyoo_crus_glob.home().hall_by( $bog_pay_app_person, {} )
		}

		accept() { return 'image/*' }
		multiple() { return false }

		@ $mol_mem
		image_data() {
			const bins = this.profile()?.Photos()?.remote_list() ?? []
			return bins[0]?.val() ?? null
		}

		@ $mol_mem
		image_uri() {
			const data = this.image_data()
			if( !data ) return ''
			const blob = new Blob( [ data ], { type: 'image/*' } )
			return URL.createObjectURL( blob )
		}

		// Visual content: current image (if exists) or upload icon, plus native input to catch clicks
		sub() {
			const has_image = !!this.image_data()
			const view = has_image
				? this.Image()
				: this.Icon()

			// Ensure native file input is present and clickable over the whole tile
			return [ view, this.Native() ]
		}

		Image() {
			const $ = this.$
			return $.$mol_image.make({
				title: $mol_const( '' ),
				uri: () => this.image_uri(),
			})
		}

		Icon() {
			const $ = this.$
			return $.$mol_icon_upload.make({})
		}

		// Handle file selection: keep only one image in Photos
		files( next?: readonly File[] ) {
			if( next && next.length ) {
				const person = this.profile()!
				const list = person.Photos( null )!
				const existed = person.Photos()?.remote_list() ?? []

				// Remove previous avatar if any
				if( existed[0] ) list.has( existed[0].ref(), false )

				// Save new avatar to CRUS
				const blob = this.$.$mol_wire_sync( next[0] ).arrayBuffer()
				const bin = list.remote_make({})!
				bin.val( new Uint8Array( blob ) )
			}
			// reset input value to allow re-upload same file later
			return []
		}

	}

	// Styles to match mol_attach tile sizing and behavior
	$mol_style_define( $bog_pay_app_account_avatar, {
		width: '6rem',
		height: '6rem',
		background: { color: $mol_theme.card },
		border: { radius: $mol_gap.round },
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		position: 'relative',

		$mol_image: {
			width: '100%',
			height: '100%',
			maxWidth: '100%',
		},

		Native: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			opacity: 0,
			cursor: 'pointer',
		},

		Icon: {
			width: '50%',
			height: '50%',
		},
	} )

}
