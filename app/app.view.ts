namespace $.$$ {
	export class $bog_pay_app extends $.$bog_pay_app {
		@$mol_mem
		current_page(next?: string) {
			return next ?? 'home'
		}

		home_open() {
			this.current_page('home')
		}

		games_open() {
			this.current_page('games')
		}

		account_open() {
			this.current_page('account')
		}

		@$mol_mem
		Page_content() {
			const page = this.current_page()
			switch (page) {
				case 'home':
					return this.Home()
				case 'games':
					return this.Games()
				case 'account':
					return this.Account()
				default:
					return this.Home()
			}
		}

		Home() {
			return new this.$.$bog_pay_app_home()
		}

		Games() {
			return new this.$.$bog_pay_app_games()
		}

		Account() {
			return new this.$.$bog_pay_app_account()
		}

		@$mol_mem
		current_page(next?: string) {
			return next ?? 'home'
		}

		home_open(next?: any) {
			if (next !== undefined) {
				this.current_page('home')
			}
		}

		games_open(next?: any) {
			if (next !== undefined) {
				this.current_page('games')
			}
		}

		account_open(next?: any) {
			if (next !== undefined) {
				this.current_page('account')
			}
		}

		@$mol_mem
		Page_content() {
			const page = this.current_page()
			switch (page) {
				case 'home':
					return this.Home()
				case 'games':
					return this.Games()
				case 'account':
					return this.Account()
				default:
					return this.Home()
			}
		}

		Home() {
			return new this.$.$bog_pay_app_home()
		}

		Games() {
			return new this.$.$bog_pay_app_games()
		}

		Account() {
			return new this.$.$bog_pay_app_account()
		}
	}
}
