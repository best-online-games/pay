namespace $.$$ {
	export class $bog_pay_app_deck extends $.$bog_pay_app_deck {
		
		// Текущая активная страница (по умолчанию 'home')
		@$mol_mem
		current_page(next?: string) {
			return next ?? 'home'
		}
		
		// Обработчик клика на кнопку "Главная"
		home_select() {
			this.current_page('home')
		}
		
		// Обработчик клика на кнопку "Игры"
		games_select() {
			this.current_page('games')
		}
		
		// Обработчик клика на кнопку "Личный кабинет"
		account_select() {
			this.current_page('account')
		}
		
		// Возвращает текущую страницу для отображения
		@$mol_mem
		page_current() {
			const page = this.current_page()
			switch (page) {
				case 'home':
					return [this.Home_page()]
				case 'games':
					return [this.Games_page()]
				case 'account':
					return [this.Account_page()]
				default:
					return [this.Home_page()]
			}
		}
		
	}
}
