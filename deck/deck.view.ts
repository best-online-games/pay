namespace $.$$ {
	export class $bog_pay_deck extends $.$bog_pay_deck {
		@$mol_mem
		override Switch(): $bog_pay_switch {
			// Создаём наш кастомный Switch вместо базового $mol_switch
			const sw = new this.$.$bog_pay_switch()

			// Привязываем опции и текущее значение из deck
			sw.options = () => this.switch_options()
			sw.value = (next?: string) => this.current(next)

			// Пробрасываем метод option_some_attr
			sw.option_some_attr = (id: string) => this.switch_option_some_attr(id)

			return sw
		}
	}
}
