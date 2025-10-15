namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		
		@$mol_mem
		page() {
			return this.$.$mol_state_arg.value('page') || 'home'
		}
		
		@$mol_action
		games_click() {
			this.$.$mol_state_arg.value('page', 'games')
		}
		
		@$mol_action
		account_click() {
			this.$.$mol_state_arg.value('page', 'account')
		}
		
	}
}
