namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		
		@$mol_mem
		page() {
			return this.$.$mol_state_arg.value('page') || ''
		}
		
		@$mol_action
		to_games() {
			this.$.$mol_state_arg.value('page', 'games')
		}
		
		@$mol_action
		to_account() {
			this.$.$mol_state_arg.value('page', 'account')
		}
		
	}
}
