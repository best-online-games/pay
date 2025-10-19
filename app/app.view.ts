namespace $.$$ {
	new $mol_after_frame(() => {
		$hyoo_crus_yard.masters = ['https://crus.hd4.ru/'] // только прод-мастер
		$hyoo_crus_glob.yard().sync() // дёрнуть синхронизацию
	})

	export class $bog_pay_app extends $.$bog_pay_app {
		@$mol_mem
		override Deck() {
			const deck = super.Deck()
			console.log('app Deck() created')
			// Устанавливаем атрибут для второй кнопки (Games с индексом '1')
			deck.switch_option_some_attr = (id: string) => {
				const result = id === '1' ? 'bla' : ''
				console.log('app deck.switch_option_some_attr:', { id, result })
				return result
			}
			return deck
		}

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
