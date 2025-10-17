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
}
