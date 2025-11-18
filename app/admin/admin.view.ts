namespace $.$$ {
	// 1) Список админов по короткому user_id (peer)
	// Заполняй сюда свои user_id (например: 'u2ldl9lC', 'abc12345', ...)
	export const $bog_pay_app_admin_peers = [
		'oUduJQXl',
		'mcBM6jhX',
		'SSCOg7yi', // Current user
		// 'CR9M4ik7',
		// 'SjixkGkN'
	] as const
	// Admin page: shows list of users and runs "cron-like" enforcement while open.
	export class $bog_pay_app_admin extends $.$bog_pay_app_admin {
		@$mol_mem
		is_admin() {
			const my_peer = $hyoo_crus_glob.home().land().auth().peer()
			const is_admin = ($bog_pay_app_admin_peers as readonly string[]).includes(my_peer)

			return is_admin
		}

		title() {
			new $mol_after_frame(() => {
				const btn = $mol_dom_context.document.querySelector(
					'[id^="$bog_pay_app.Root"] [mol_deck_switch_option][id$="Option(\'3\')"]',
				) as HTMLElement | null
				if (btn && !this.is_admin()) {
					btn.style.display = 'none'
				}
			})
			if (this.is_admin()) {
				return $mol_locale.text(super.title())
			} else {
				return ''
			}
		}
	}
}
