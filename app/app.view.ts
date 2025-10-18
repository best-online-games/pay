namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		body() {
			const originalLang = this.$.$mol_locale.lang()
			this.$.$mol_locale.lang('en')
			this.$.$mol_state_arg.value('page', this.Deck().Content().title().replaceAll(' ', '_'))
			this.$.$mol_locale.lang(originalLang)
			return [this.Content()]
		}

		Admin_link() {
			// Show admin link only if current user is in admins registry and not excluded test peer
			const link = super.Admin_link()
			const my_pub = this.$.$hyoo_crus_glob.home().land().auth().public().toString()
			const peers = (this.$ as any).$bog_pay_app_admins?.peers?.() ?? []
			if (my_pub === 'u2ldl9lC') return null as any
			return peers.includes(my_pub) ? link : (null as any)
		}
	}

	export const $bog_pay_person = $.$bog_pay_app_person
	export const $bog_pay_plan = $.$bog_pay_app_plan
	export const $bog_pay_subscription = $.$bog_pay_app_subscription
	export const $bog_pay_account = $.$bog_pay_app_account_domain
	export const $bog_pay_invoice = $.$bog_pay_app_invoice
}
