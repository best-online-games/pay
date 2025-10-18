namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		body() {
			const originalLang = this.$.$mol_locale.lang()
			this.$.$mol_locale.lang('en')
			this.$.$mol_state_arg.value('page', this.Deck().Content().title().replaceAll(' ', '_'))
			this.$.$mol_locale.lang(originalLang)
			return [this.Content()]
		}
	}

	export const $bog_pay_person = $.$bog_pay_app_person
	export const $bog_pay_plan = $.$bog_pay_app_plan
	export const $bog_pay_subscription = $.$bog_pay_app_subscription
	export const $bog_pay_account = $.$bog_pay_app_account_domain
	export const $bog_pay_invoice = $.$bog_pay_app_invoice
}
