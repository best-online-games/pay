namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		@$mol_mem
		page(next?: string) {
			return this.$.$mol_state_arg.value('page', next) || 'home'
		}

		@$mol_action
		to_games() {
			this.page('games')
		}

		@$mol_action
		to_account() {
			this.page('account')
		}
	}
}
